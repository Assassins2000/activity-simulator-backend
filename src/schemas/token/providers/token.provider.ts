import { Injectable } from '@nestjs/common';
import Token from '../token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { TokenDocument } from '@app/schemas/token/token.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class TokenProvider {
  constructor(@InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>) {}

  public async createToken(userId: string): Promise<string> {
    const salt = await bcrypt.genSalt(3);
    const tokenHash = await bcrypt.hash(Date.now().toString(), salt);
    const token = new this.tokenModel({ user: userId, token: tokenHash });
    this.tokenModel.updateOne();
    await token.save();
    // @ts-ignore
    return token.getHash();
  }
}
