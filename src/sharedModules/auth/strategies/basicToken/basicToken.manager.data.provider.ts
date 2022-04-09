import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from '@app/schemas/token.schema';
import { BasicTokenManagerPort } from '@app/domains/account/auth/strategies/basicToken.manager.port';
import { Model } from 'mongoose';
import { DUser } from '@app/domains/models/user.model';

@Injectable()
export class BasicTokenManagerDataProvider implements BasicTokenManagerPort {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

  async getUserByToken(token: string): Promise<DUser> {
    const tokenObject = await this.tokenModel.findOne({ key: token }).populate('user');
    if (!tokenObject) {
      throw new Error();
    }
    const { user } = tokenObject;
    return new DUser(user._id.toString(), user.name, user.login);
  }

  async createToken(userId: string, tokenHash?: string): Promise<string> {
    const token = new this.tokenModel({ user: userId, key: tokenHash });
    await token.save();
    return token.key;
  }
}
