import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import BasicTokenManagerDataProvider from './basicToken.manager.data.provider';
import { BasicTokenManagerPort } from '@app/domains/account/auth/strategies/basicToken.manager.port';
import { DUser } from '@app/domains/models/user.model';

@Injectable()
export class BasicTokenAuthProvider extends PassportStrategy(Strategy) {
  constructor(@Inject(BasicTokenManagerDataProvider) private readonly dataProvider: BasicTokenManagerPort) {
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
