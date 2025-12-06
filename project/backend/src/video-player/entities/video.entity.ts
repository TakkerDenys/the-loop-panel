import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Video {
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.uploadedAt = new Date(Date.now());
  }

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ name: 'uploaded_at' })
  uploadedAt: Date;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
