import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Metadata, MetadataSchema } from './metadata.entity';
import mongoose, { Document } from 'mongoose';
import { Video, VideoSchema } from './video.entity';

@Schema()
export class VideoPlayer {
  constructor(video: Video, userId: string) {
    this.isPlayingNow = false;
    this.launchedAt = null;
    this.queue = [video];
    this.userId = userId;
  }

  @Prop({ name: '_id' })
  id: string;

  @Prop({ name: 'is_playing_now' })
  isPlayingNow: boolean;

  @Prop({ name: 'launched_at', type: Date || null })
  launchedAt: Date | null;

  @Prop({ type: [VideoSchema] })
  queue: Video[];

  @Prop({ type: MetadataSchema || null })
  metadata: Metadata | null;

  @Prop({ name: 'user_id', type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
}

export type VideoPlayerDocument = VideoPlayer & Document;
export const VideoPlayerSchema = SchemaFactory.createForClass(VideoPlayer);
