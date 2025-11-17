import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SignUpRequestDto } from 'src/auth/dtos/signup-request.dto';
import bcrypt from 'bcrypt';

@Schema()
export class User {
  constructor(signUpRequest: SignUpRequestDto) {
    this.name = signUpRequest.name;
    this.email = signUpRequest.email;
    this.password = signUpRequest.password;
  }

  @Prop({ name: '_id' })
  id: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ name: 'refresh_token', type: String, required: false })
  refreshToken: string | null;

  @Prop({ name: 'created_at' })
  createdAt: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.createdAt = Date.now().toString();
  next();
});
