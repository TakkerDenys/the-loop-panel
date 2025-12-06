import { ApiProperty } from '@nestjs/swagger';

export class TemperatureInfoDto {
  @ApiProperty({ example: 9.63, description: 'Temperature at the moment' })
  temp: number;

  @ApiProperty({
    example: 9.63,
    description: 'Feels like temperature at the moment',
  })
  feels_like: number;

  @ApiProperty({
    example: 9.63,
    description: 'Minimum temperature at the moment',
  })
  temp_min: number;

  @ApiProperty({
    example: 9.63,
    description: 'Maximum temperature at the moment',
  })
  temp_max: number;

  @ApiProperty({ example: 1016, description: 'Atmospheric pressure (hPa)' })
  pressure: number;

  @ApiProperty({ example: 94, description: 'Humidity percentage' })
  humidity: number;

  @ApiProperty({
    example: 1016,
    description: 'Sea level atmospheric pressure (hPa)',
  })
  sea_level: number;

  @ApiProperty({
    example: 999,
    description: 'Ground level atmospheric pressure (hPa)',
  })
  grnd_level: number;
}
