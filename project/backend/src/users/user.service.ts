import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userEntity: Model<UserDocument>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userEntity.find();
  }

  async getById(id: string) {
    const user = await this.userEntity.findById(id);
    if (!user) {
      throw new HttpException(
        `The user with the ${id} id wasn't found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async getByEmail(email: string) {
    return await this.userEntity.findOne({ email });
  }

  async getByRefreshToken(refreshToken: string) {
    return await this.userEntity.findOne({ refreshToken });
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    return await this.userEntity.findByIdAndUpdate(
      userId,
      { refreshToken },
      { new: true },
    );
  }

  async updateVideoPlayerId(userId: string, videoPlayerId: string | null) {
    return await this.userEntity.findByIdAndUpdate(
      userId,
      { videoPlayerId },
      { new: true },
    );
  }

  async save(user: User) {
    return await new this.userEntity(user).save();
  }

  async deleteById(id: string) {
    const user = await this.getById(id);
    await this.userEntity.deleteOne(user as User);
  }

  async isUserExist(userId: string): Promise<boolean> {
    const user = await this.userEntity.exists({ _id: userId });
    return !user ? false : true;
  }
}
