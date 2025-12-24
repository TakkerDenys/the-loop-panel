import { ApiProperty } from '@nestjs/swagger';

export class SystemInfoDto {
  @ApiProperty({ example: 'UA', description: 'Country code' })
  country: string;

  @ApiProperty({
    example: '1762751032',
    description: 'Sunrise time (unix timestamp)',
  })
  sunrise: string;

  @ApiProperty({
    example: '1762784392',
    description: 'Sunset time (unix timestamp)',
  })
  sunset: string;
}
