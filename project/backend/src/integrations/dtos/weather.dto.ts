import { ApiProperty } from '@nestjs/swagger';
import { TemperatureInfoDto } from './temperature-info.dto';
import { WeatherInfoDto } from './weather-info.dto';
import { CoordinatesDto } from './coordinates.dto';
import { WindDto } from './wind.dto';
import { CloudsDto } from './clouds.dto';
import { SystemInfoDto } from './system-info.dto';

export class WeatherDto {
  @ApiProperty()
  coordinates: CoordinatesDto;

  @ApiProperty()
  weather: [WeatherInfoDto];

  @ApiProperty()
  main: TemperatureInfoDto;

  @ApiProperty({ example: 10000, description: 'Visibility in meters' })
  visibility: number;

  @ApiProperty()
  wind: WindDto;

  @ApiProperty()
  clouds: CloudsDto;

  @ApiProperty({
    example: '1762796559',
    description: 'Data calculation timestamp (unix)',
  })
  timestamp: string;

  @ApiProperty()
  system_info: SystemInfoDto;

  @ApiProperty({
    example: 7200,
    description: 'Timezone shift in seconds from UTC',
  })
  timezone: number;

  @ApiProperty({ example: 'Kyiv', description: 'City name' })
  name: string;
}
