import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from '@app/schemas/token.schema';
import { Model } from 'mongoose';
import { DUser } from '@app/domains/models/user.model';

@Injectable()
export default class ClassicTokenDataProvider {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

  async getUserByToken(token: string): Promise<DUser> {
    const tokenObject = await this.tokenModel.findOne({ key: token }).populate('user');
    if (!tokenObject) {
      throw new Error();
    }
    const { user } = tokenObject;
    return new DUser(user._id.toString(), user.name, user.login);
  }
}
