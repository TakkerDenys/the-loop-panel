import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WeatherDto } from './dtos/weather.dto';
import { CoordinatesDto } from './dtos/coordinates.dto';

@Injectable()
export class IntegrationService {
  constructor(private readonly configService: ConfigService) {}

  async getWeather(location?: string, lang: string = 'ua') {
    if (location === undefined) {
      throw new HttpException(
        'You must enter the location',
        HttpStatus.BAD_REQUEST,
      );
    }

    const apiKey = this.configService.get<string>('OPEN_WEATHER_API_KEY');
    const coordinates = (await (
      await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`,
      )
    ).json()) as CoordinatesDto[];

    if (coordinates.length < 1) {
      throw new HttpException(
        'We cannot process this request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const { lat, lon } = coordinates[0];
    return (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}&units=metric`,
      )
    ).json() as unknown as WeatherDto;
  }
}
