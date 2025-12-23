import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtPayload} from 'src/auth/types/jwt-payload.type';
import {UserService} from 'src/users/user.service';
import {
    VideoPlayer,
    VideoPlayerDocument,
} from './entities/video-player.entity';
import {Video} from './entities/video.entity';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UploadVideoRequest} from './dto/upload-video-request.dto';
import {StopPlayerRequest} from './dto/stop-player-request.dto';
import {RemoveVideoRequest} from './dto/remove-video-request.dto';
import fs from 'fs';
import {ChangeOrderOfVideoRequest} from './dto/change-order-of-video-request.dto';

@Injectable()
export class VideoPlayerService {
    constructor(
        private readonly userService: UserService,
        @InjectModel(VideoPlayer.name)
        private readonly videoPlayerEntity: Model<VideoPlayerDocument>,
    ) {
    }

    private readonly PATH_TO_VIDEO_FOLDER = process.env.PATH_TO_VIDEO_FOLDER;

    async uploadVideo(
        jwtPayload: JwtPayload,
        filename: string,
        uploadVideoRequest: UploadVideoRequest,
    ) {
        const user = await this.userService.getById(jwtPayload.userId);
        const video = new Video(filename, uploadVideoRequest.description);

        if (!user.videoPlayerId) {
            const videoPlayer = new VideoPlayer(video, jwtPayload.userId);
            const savedPlayer = await new this.videoPlayerEntity(videoPlayer).save();

            await this.userService.updateVideoPlayerId(
                user._id.toString(),
                savedPlayer._id.toString(),
            );
            return savedPlayer;
        }

        const videoPlayer = await this.getById(user.videoPlayerId);
        videoPlayer.queue.push(video);
        return await this.videoPlayerEntity.findByIdAndUpdate(
            user.videoPlayerId,
            videoPlayer,
            {new: true},
        );
    }

    async launchPlayer(jwtPayload: JwtPayload) {
        const videoPlayer = await this.getByUserId(jwtPayload.userId);
        videoPlayer.isPlayingNow = true;
        videoPlayer.launchedAt = new Date(Date.now());

        if (videoPlayer.metadata) {
            videoPlayer.metadata = null;
        }

        return await this.videoPlayerEntity.findByIdAndUpdate(
            videoPlayer._id,
            videoPlayer,
            {new: true},
        );
    }

    async stopPlayer(
        jwtPayload: JwtPayload,
        stopPlayerRequest: StopPlayerRequest,
    ) {
        const videoPlayer = await this.getByUserId(jwtPayload.userId);
        videoPlayer.isPlayingNow = false;
        videoPlayer.launchedAt = null;

        videoPlayer.metadata = {
            currentVideoNum: stopPlayerRequest.currentVideoNum,
            timeline: stopPlayerRequest.timeline,
        };

        return await this.videoPlayerEntity.findByIdAndUpdate(
            videoPlayer._id,
            videoPlayer,
            {new: true},
        );
    }

    async removeVideo(
        jwtPayload: JwtPayload,
        removeVideoRequest: RemoveVideoRequest,
    ) {
        console.log('removeVideo called with:', {
            request: removeVideoRequest,
            currentVideoNum: removeVideoRequest.currentVideoNum,
            type: typeof removeVideoRequest.currentVideoNum
        });

        const videoPlayer = await this.getByUserId(jwtPayload.userId);
        const index = Number(removeVideoRequest.currentVideoNum);

        console.log('Parsed index:', index, 'isNaN:', isNaN(index));

        if (videoPlayer.queue.length > index) {
            const video = videoPlayer.queue[index];
            videoPlayer.queue.splice(index, 1);

            fs.rm(this.PATH_TO_VIDEO_FOLDER + video.name, (err) => {
                console.log(err);
            });

            // If queue becomes empty, DELETE the VideoPlayer completely
            if (videoPlayer.queue.length === 0) {
                await this.videoPlayerEntity.findByIdAndDelete(videoPlayer._id);
                await this.userService.updateVideoPlayerId(jwtPayload.userId, null);

                return {message: 'Video player deleted, queue is empty'};
            }

            // Otherwise just update the queue
            const updatedPlayer = await this.videoPlayerEntity.findByIdAndUpdate(
                videoPlayer._id,
                videoPlayer,
                {new: true},
            );

            if (!updatedPlayer) {
                throw new HttpException(
                    'Failed to update video player',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }

            return updatedPlayer;
        }

        throw new HttpException(
            `The queue length is less than ${index}`,
            HttpStatus.BAD_REQUEST,
        );
    }

    async changeOrderOfVideo(
        jwtPayload: JwtPayload,
        changeOrderOfVideoRequest: ChangeOrderOfVideoRequest,
    ) {
        const videoPlayer = await this.getByUserId(jwtPayload.userId);
        const videos: Array<{ index: number; video: Video }> = [];

        for (const video of videoPlayer.queue) {
            if (changeOrderOfVideoRequest.videoNames.includes(video.name)) {
                const index = changeOrderOfVideoRequest.videoNames.findIndex(
                    (value) => value === video.name,
                );

                if (index >= 0) {
                    videos.push({index, video});
                    continue;
                }

                throw new HttpException(
                    "The request doesn't contain all video names",
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        const sorted = videos.sort((prev, current) => prev.index - current.index);

        videoPlayer.queue = sorted.map((value) => value.video);
        return await this.videoPlayerEntity.findByIdAndUpdate(
            videoPlayer._id,
            videoPlayer,
            {new: true},
        );
    }

    async getOwn(jwtPayload: JwtPayload): Promise<VideoPlayer> {
        return await this.getByUserId(jwtPayload.userId);
    }

    async getAll(): Promise<VideoPlayer[]> {
        return await this.videoPlayerEntity.find();
    }

    async getById(id: string): Promise<VideoPlayer> {
        const videoPlayer = await this.videoPlayerEntity.findById(id);
        if (!videoPlayer) {
            throw new HttpException(
                `The video player with '${id}' wasn't found`,
                HttpStatus.NOT_FOUND,
            );
        }

        return videoPlayer;
    }

    async getByUserId(userId: string) {
        const videoPlayer = await this.videoPlayerEntity.findOne({
            userId,
        });

        if (!videoPlayer) {
            throw new HttpException(
                "The user's video player wasn't found",
                HttpStatus.NOT_FOUND,
            );
        }

        return videoPlayer;
    }

    async remove(id: string) {
        const videoPlayer = this.getById(id);
        await this.videoPlayerEntity.findOneAndDelete(videoPlayer);
    }
}
