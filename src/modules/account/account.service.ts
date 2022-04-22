import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { AccountManagerPort, BasicTokenManagerPort } from '@app/domains/account';
import { BasicTokenManagerDataProvider } from '@app/sharedModules/auth';
import { AccountManagerDataProvider } from './data/accountManager/account.manager.data.provider';
import BaseUserEntity from '@app/modules/baseEntities/baseUser.entity';
import { LoginDto, RegisterDto } from './dto';
import { DUser } from '@app/domains/models';
import * as bcrypt from 'bcrypt';
import { AccountServiceErrorCode } from './constants';
import { AccountServiceError, LoginResponse } from './types';

@Injectable()
export class AccountService {
  constructor(
    @Inject(AccountManagerDataProvider) private readonly accountManagerDataAdapter: AccountManagerPort,
    @Inject(BasicTokenManagerDataProvider) private readonly authManagerDataAdapter: BasicTokenManagerPort,
  ) {}

  public async validateUser(data: LoginDto): Promise<LoginResponse> {
    const { username, password } = data;
    try {
      const user: DUser = await this.validateUserByUsernameAndPassword(username, password);
      const salt = await bcrypt.genSalt(3);
      const hashToken = await bcrypt.hash(Date.now().toString(), salt);
      return {
        token: await this.authManagerDataAdapter.createToken(user.id, hashToken),
        user: new BaseUserEntity(user),
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  // TODO Add the token expire time
  // eslint-disable-next-line class-methods-use-this
  public async getUserWithRequiredData(user: DUser): Promise<BaseUserEntity> {
    return new BaseUserEntity(user);
  }

  public async createUser(data: RegisterDto): Promise<BaseUserEntity | AccountServiceError> {
    const { name, login, password } = data;
    if (await this.accountManagerDataAdapter.isUserWithUsernameExist(name)) {
      return {
        code: AccountServiceErrorCode.UserWithSuchUsernameExist,
        message: 'User with such username exists',
      };
    }
    const user: DUser = await this.accountManagerDataAdapter.createUser(new DUser(name, login), password);
    return new BaseUserEntity(user);
  }

  private async validateUserByUsernameAndPassword(username: string, password: string): Promise<DUser> {
    const user = await this.accountManagerDataAdapter.getUserByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordsCompare = await bcrypt.compare(password, <string>user.password);
    if (!isPasswordsCompare) {
      throw new Error('Password not compare');
    }
    return user;
  }
}
