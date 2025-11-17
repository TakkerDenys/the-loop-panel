import { Injectable } from '@nestjs/common';
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

  async getById(id: string): Promise<User> {
    const user = await this.userEntity.findById(id);
    if (!user) {
      throw new Error(`The user with the ${id} id wasn't found`);
    }

    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.userEntity.findOne({ email });
  }

  async getByRefreshToken(refreshToken: string): Promise<User | null> {
    return await this.userEntity.findOne({ refreshToken });
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    return await this.userEntity.findByIdAndUpdate(userId, { refreshToken });
  }

  async save(user: User) {
    return await new this.userEntity(user).save();
  }

  async deleteById(id: string) {
    const user = await this.getById(id);
    await this.userEntity.deleteOne(user);
  }

  async isUserExist(userId: string): Promise<boolean> {
    const user = await this.userEntity.exists({ _id: userId });
    console.log(user);
    return !user ? false : true;
  }
}
