import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray } from 'class-validator';

export class ChangeOrderOfVideoRequest {
  @ApiProperty({ type: Array<string> })
  @IsArray()
  @ArrayUnique()
  videoNames: Array<string>;
}
