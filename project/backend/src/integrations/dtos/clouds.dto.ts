import { ApiProperty } from '@nestjs/swagger';

export class CloudsDto {
  @ApiProperty({ example: '100', description: 'Cloudiness percentage' })
  all: number;
}
