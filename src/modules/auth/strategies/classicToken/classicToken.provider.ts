import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import ClassicTokenDataProvider from './data/classicToken.data.provider';
import { DUser } from '@app/domains/models/user.model';

@Injectable()
export class ClassicTokenProvider extends PassportStrategy(Strategy) {
  constructor(private readonly dataProvider: ClassicTokenDataProvider) {
    super();
  }

  async validate(token: string): Promise<DUser> {
    const user = await this.dataProvider.getUserByToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
