import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { SignUpRequestDto } from './dtos/signup-request.dto';
import { LoginRequestDto } from './dtos/login-request.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/decorators/public.decorator';
import type { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dtos/auth-response.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({
    description:
      'Is returned if the entered email is already taken, or if the values have been entered in the wrong format',
  })
  async signup(
    @Body() signupRequest: SignUpRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.signUp(signupRequest, res);
  }

  @Public()
  @Post('/login')
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({
    description:
      'Is returned if the credentials are incorrect, or if the values have been entered in the wrong format',
  })
  async login(
    @Body() loginRequest: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.login(loginRequest, res);
  }

  @Post('/refresh')
  @ApiOkResponse({ type: AuthResponse })
  @ApiBearerAuth('access-token')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(req['jwtPayload'], res);
  }

  @Post('/logout')
  @ApiNoContentResponse()
  @ApiBearerAuth('access-token')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(req['jwtPayload'], res);
  }
}
