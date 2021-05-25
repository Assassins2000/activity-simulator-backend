import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthProvider {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async validateUserByUsernameAndPassword(username: string, password: string): Promise<UserDocument> {
    const user: UserDocument | null = await this.userModel.findOne({ login: username });
    if (!user) {
      throw new Error('UserSchema not found');
    }
    const isPasswordsCompare = await bcrypt.compare(password, user.password);
    if (!isPasswordsCompare) {
      throw new Error('Password not compare');
    }
    return user;
  }
}
