import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class RemoveVideoRequest {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  currentVideoNum: number;
}
