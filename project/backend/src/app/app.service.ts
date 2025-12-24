import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  async profile(jwtPayload: JwtPayload) {
    return this.userService.getById(jwtPayload.userId);
  }
}
