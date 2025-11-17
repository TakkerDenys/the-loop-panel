import { Injectable } from '@nestjs/common';
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
    const isEmailUnique = await this.userService.getByEmail(
      signUpRequest.email,
    );

    if (isEmailUnique) {
      throw new Error(
        'The error occured during registration: the email is already taken',
      );
    }

    const user = new User(signUpRequest);
    const savedUser = await this.userService.save(user);

    const payload: JwtPayload = { userId: savedUser._id as string };
    const accessToken = await this.generateJwtAccessToken(payload);

    const refreshToken = await this.generateJwtRefreshToken(payload);
    await this.userService.updateRefreshToken(
      savedUser._id as string,
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
    if (!user) {
      throw new Error("The user isn't registered yet");
    }

    const isValidUser = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!isValidUser) {
      throw new Error("The credentials aren't correct");
    }

    const payload: JwtPayload = { userId: user.id };
    const accessToken = await this.generateJwtAccessToken(payload);

    const refreshToken = await this.generateJwtRefreshToken(payload);
    await this.userService.updateRefreshToken(user.id, refreshToken);

    this.setRefreshTokenInCookie(res, refreshToken);
    return { jwt: accessToken };
  }

  async refresh(jwtPayload: JwtPayload, res: Response) {
    if (await this.userService.isUserExist(jwtPayload.userId)) {
      const newToken = await this.generateJwtRefreshToken(jwtPayload);
      await this.userService.updateRefreshToken(jwtPayload.userId, newToken);
      this.setRefreshTokenInCookie(res, newToken);
    }
  }

  async logout(jwtPayload: JwtPayload, res: Response) {
    if (await this.userService.isUserExist(jwtPayload.userId)) {
      await this.userService.updateRefreshToken(jwtPayload.userId, null);
      res.clearCookie('refresh_token');
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
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
