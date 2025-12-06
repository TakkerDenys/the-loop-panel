import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  Body,
  HttpCode,
} from '@nestjs/common';
import { VideoPlayerService } from './video-player.service';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import type { Request } from 'express';
import { UploadVideoRequest } from './dto/upload-video-request.dto';
import { StopPlayerRequest } from './dto/stop-player-request.dto';
import { RemoveVideoRequest } from './dto/remove-video-request.dto';
import { ChangeOrderOfVideoRequest } from './dto/change-order-of-video-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import iconv from 'iconv-lite';
import { diskStorage } from 'multer';
import fs from 'fs';

@ApiBearerAuth('access-token')
@Controller('/api/video-player')
export class VideoPlayerController {
  constructor(private readonly videoPlayerService: VideoPlayerService) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const path = process.env.PATH_TO_VIDEO_FOLDER as string;
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
          }

          callback(null, path);
        },
        filename: (req, file, callback) => {
          const decodedName = iconv.decode(
            Buffer.from(file.originalname, 'latin1'),
            'utf8',
          );
          const origName = decodedName.split('.');
          const extension = origName[origName.length - 1];
          origName[origName.length - 1] = '';

          const datetime = Date.now();
          const filename = datetime + '-' + origName.join('') + `.${extension}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: { type: 'string' },
        video: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadVideo(
    @Req() req: Request,
    @UploadedFile() video: Express.Multer.File,
    @Body() uploadVideoRequest: UploadVideoRequest,
  ) {
    return await this.videoPlayerService.uploadVideo(
      req['jwtPayload'],
      video.filename,
      uploadVideoRequest,
    );
  }

  @Post('/launch')
  @HttpCode(200)
  async launchPlayer(@Req() req: Request) {
    return await this.videoPlayerService.launchPlayer(req['jwtPayload']);
  }

  @Post('/stop')
  @HttpCode(200)
  async stopPlayer(
    @Req() req: Request,
    @Body() stopPlayerRequest: StopPlayerRequest,
  ) {
    return await this.videoPlayerService.stopPlayer(
      req['jwtPayload'],
      stopPlayerRequest,
    );
  }

  @Post('/remove-video')
  @HttpCode(200)
  async removeVideo(
    @Req() req: Request,
    @Body() removeVideoRequest: RemoveVideoRequest,
  ) {
    return await this.videoPlayerService.removeVideo(
      req['jwtPayload'],
      removeVideoRequest,
    );
  }

  @Post('/change-order-of-video')
  @HttpCode(200)
  async changeOrderOfVideo(
    @Req() req: Request,
    @Body() changeOrderOfVideoRequest: ChangeOrderOfVideoRequest,
  ) {
    return await this.videoPlayerService.changeOrderOfVideo(
      req['jwtPayload'],
      changeOrderOfVideoRequest,
    );
  }

  @Get('/own')
  async getOwn(@Req() req: Request) {
    return await this.videoPlayerService.getOwn(req['jwtPayload']);
  }

  @Get()
  async getAll() {
    return await this.videoPlayerService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.videoPlayerService.getById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.videoPlayerService.remove(id);
  }
}
