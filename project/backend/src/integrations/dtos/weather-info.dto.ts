import { ApiProperty } from '@nestjs/swagger';

export class WeatherInfoDto {
  @ApiProperty({
    example: 'Clouds',
    description: 'Group of weather parameters (Rain, Snow, Extreme etc.)',
  })
  main: string;

  @ApiProperty({
    example: 'cloudy',
    description: 'Weather condition within the group',
  })
  description: string;

  @ApiProperty({ example: '04n', description: 'Weather icon ID' })
  icon: string;
}
