import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class StopPlayerRequest {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  currentVideoNum: number;

  @ApiProperty()
  @IsString()
  timeline: string;
}
