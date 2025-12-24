import { Controller, Get, Query } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { WeatherDto } from './dtos/weather.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger';

@Controller('/api/integrations')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Get('/weather')
  @ApiOkResponse({ type: WeatherDto })
  @ApiQuery({ name: 'lang', required: false })
  @ApiBearerAuth('access-token')
  async getWeather(
    @Query('location') location?: string,
    @Query('lang') lang?: string,
  ): Promise<WeatherDto> {
    return await this.integrationService.getWeather(location, lang);
  }
}
