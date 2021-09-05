import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@app/schemas/user.schema';
import { Token, TokenDocument } from '@app/schemas/token.schema';
import { Model } from 'mongoose';
import { DUser } from '@app/domains/models/user.model';
import { ClassicTokenLoginDataProvider } from '@app/domains/account/classicToken.login.data.provider';

@Injectable()
export class LoginDataProvider implements ClassicTokenLoginDataProvider {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Token.name)
    private readonly tokenModel: Model<TokenDocument>,
  ) {}

  public async getUserByUsername(username: string): Promise<DUser | null> {
    const user = await this.userModel.findOne({ login: username }).lean();
    if (!user) {
      return null;
    }
    return new DUser(user._id.toString(), user.name, user.login, user.password);
  }

  async createToken(userId: string, tokenHash?: string): Promise<string> {
    const token = new this.tokenModel({ user: userId, key: tokenHash });
    await token.save();
    return token.key;
  }
}
