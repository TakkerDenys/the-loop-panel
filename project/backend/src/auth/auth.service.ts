import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { SignUpRequestDto } from './dtos/signup-request.dto';
import { LoginRequestDto } from './dtos/login-request.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';
import { UserService } from 'src/users/user.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthResponse } from './dtos/auth-response.dto';
import ms, { StringValue } from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(
    signUpRequest: SignUpRequestDto,
    res: Response,
  ): Promise<AuthResponse> {
    const isEmailTaken = await this.userService.getByEmail(signUpRequest.email);

    if (isEmailTaken) {
      throw new HttpException(
        'The error occured during registration: the email is already taken',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new User(signUpRequest);
    const savedUser = await this.userService.save(user);

    const payload: JwtPayload = { userId: savedUser._id.toString() };
    const accessToken = await this.generateJwtAccessToken(payload);

    const refreshToken = await this.generateJwtRefreshToken(payload);
    await this.userService.updateRefreshToken(
      savedUser._id.toString(),
      refreshToken,
    );
    this.setRefreshTokenInCookie(res, refreshToken);

    return { jwt: accessToken };
  }

  async login(
    loginRequest: LoginRequestDto,
    res: Response,
  ): Promise<AuthResponse> {
    const user = await this.userService.getByEmail(loginRequest.email);
    const loginErrorText = "The credentials aren't correct";

    if (!user) {
      throw new HttpException(loginErrorText, HttpStatus.BAD_REQUEST);
    }

    const isPassMatch = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!isPassMatch) {
      throw new HttpException(loginErrorText, HttpStatus.BAD_REQUEST);
    }

    const payload: JwtPayload = { userId: user._id.toString() };
    const accessToken = await this.generateJwtAccessToken(payload);

    const refreshToken = await this.generateJwtRefreshToken(payload);
    await this.userService.updateRefreshToken(user._id.toString(), refreshToken);

    this.setRefreshTokenInCookie(res, refreshToken);
    return { jwt: accessToken };
  }

  async refresh(jwtPayload: JwtPayload, res: Response): Promise<AuthResponse> {
    if (await this.userService.isUserExist(jwtPayload.userId)) {
      const newRefreshToken = await this.generateJwtRefreshToken(jwtPayload);
      await this.userService.updateRefreshToken(
        jwtPayload.userId,
        newRefreshToken,
      );

      this.setRefreshTokenInCookie(res, newRefreshToken);
      return { jwt: await this.generateJwtAccessToken(jwtPayload) };
    }

    throw new HttpException(
      "The user wasn't isn't exist",
      HttpStatus.BAD_REQUEST,
    );
  }

  async logout(jwtPayload: JwtPayload, res: Response) {
    if (await this.userService.isUserExist(jwtPayload.userId)) {
      await this.userService.updateRefreshToken(jwtPayload.userId, null);
      res.clearCookie('refresh_token');
      res.status(HttpStatus.NO_CONTENT);
    }
  }

  private async generateJwtAccessToken(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
    });
  }

  private async generateJwtRefreshToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });
  }

  setRefreshTokenInCookie(res: Response, token: string) {
    const refreshTokenExp = this.configService.get<string>(
      'JWT_REFRESH_EXPIRES_IN',
    );
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: ms(refreshTokenExp as StringValue),
    });
  }
}
