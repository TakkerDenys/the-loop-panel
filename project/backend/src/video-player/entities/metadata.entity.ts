import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Metadata {
  @Prop({ name: 'current_video_num' })
  currentVideoNum: number;

  @Prop()
  timeline: string;
}

export const MetadataSchema = SchemaFactory.createForClass(Metadata);
