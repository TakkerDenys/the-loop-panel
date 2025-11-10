import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WeatherDto } from './dtos/weather.dto';
import { CoordinatesDto } from './dtos/coordinates.dto';

@Injectable()
export class IntegrationService {
  constructor(private readonly configService: ConfigService) {}

  async getWeather(location?: string, lang: string = 'ua') {
    if (location === undefined) {
      throw new Error('You must enter the location');
    }

    const apiKey = this.configService.get<string>('OPEN_WEATHER_API_KEY');
    const coordinates = (await (
      await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`,
      )
    ).json()) as CoordinatesDto[];

    if (coordinates.length < 1) {
      throw new Error('We cannot process this request');
    }

    const { lat, lon } = coordinates[0];
    return (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}&units=metric`,
      )
    ).json() as unknown as WeatherDto;
  }
}
