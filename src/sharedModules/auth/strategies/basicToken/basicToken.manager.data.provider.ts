import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from '@app/schemas/token.schema';
import { UserDocument } from '@app/schemas/user.schema';
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
    const user = (tokenObject.user as unknown) as UserDocument;
    return new DUser(user.name, user.login, user._id.toString());
  }

  async createToken(userId: string, tokenHash: string): Promise<string> {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const token = new this.tokenModel(<Token>{ user: userObjectId, key: tokenHash });
    await token.save();
    return token.key;
  }
}
