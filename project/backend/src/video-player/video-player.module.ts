import { Module } from '@nestjs/common';
import { VideoPlayerService } from './video-player.service';
import { VideoPlayerController } from './video-player.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoPlayer, VideoPlayerSchema } from './entities/video-player.entity';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VideoPlayer.name, schema: VideoPlayerSchema },
    ]),
    UserModule,
  ],
  controllers: [VideoPlayerController],
  providers: [VideoPlayerService],
  exports: [MongooseModule],
})
export class VideoPlayerModule {}
