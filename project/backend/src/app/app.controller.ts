import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

@Controller('/general')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/profile')
  @ApiOkResponse({ type: User })
  @ApiBearerAuth('access-token')
  async profile(@Req() req: Request) {
    return await this.appService.profile(req['jwtPayload']);
  }
}
