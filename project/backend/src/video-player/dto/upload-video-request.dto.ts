import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadVideoRequest {
  @ApiProperty()
  @IsString()
  description: string;
}
