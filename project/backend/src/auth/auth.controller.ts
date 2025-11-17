import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { SignUpRequestDto } from './dtos/signup-request.dto';
import { LoginRequestDto } from './dtos/login-request.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/decorators/public.decorator';
import type { Request, Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  async signup(
    @Body() signupRequest: SignUpRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.signUp(signupRequest, res);
  }

  @Public()
  @Post('/login')
  async login(
    @Body() loginRequest: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.login(loginRequest, res);
  }

  @ApiBearerAuth('access-token')
  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(req['jwtPayload'], res);
  }

  @ApiBearerAuth('access-token')
  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(req['jwtPayload'], res);
  }
}
