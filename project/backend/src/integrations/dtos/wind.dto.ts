import { ApiProperty } from '@nestjs/swagger';

export class WindDto {
  @ApiProperty({ example: 1.32, description: 'Wind speed (meter/sec)' })
  speed: number;

  @ApiProperty({ example: 119, description: 'Wind direction (degrees)' })
  deg: number;

  @ApiProperty({ example: 1.45, description: 'Wind gust speed (meter/sec)' })
  gust: number;
}
