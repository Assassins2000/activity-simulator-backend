import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { LoginDataProvider } from './data/login/login.data.provider';
import { SignupDataProvider } from './data/signup/signup.data.provider';
import BaseUserWithIdEntity from '@app/controllers/baseEntities/baseUserWithId.entity';
import LoginResponseEntity from '@app/controllers/account/entities/loginReponseEntity';
import { LoginDto, SignupDto } from './dto';
import { DUser } from '@app/domains/models/user.model';
import { ClassicTokenLoginDataProvider } from '@app/domains/account/classicToken.login.data.provider';
import { ClassicTokenSignupDataProvider } from '@app/domains/account/classicToken.signup.data.provider';
import * as bcrypt from 'bcrypt';

export interface AccountServiceError {
  code: AccountServiceErrorCode;
  message: 'User with such username exists';
}

enum AccountServiceErrorCode {
  UserWithSuchUsernameExist = 'userWithSuchUsernameExist',
}

@Injectable()
export class AccountService {
  constructor(
    @Inject(LoginDataProvider.name) private readonly signInDataProvider: ClassicTokenLoginDataProvider,
    @Inject(SignupDataProvider.name) private readonly signupDataProvider: ClassicTokenSignupDataProvider,
  ) {}

  public async validateUser(data: LoginDto): Promise<LoginResponseEntity> {
    const { username, password } = data;
    try {
      const user: DUser = await this.validateUserByUsernameAndPassword(username, password);
      const salt = await bcrypt.genSalt(3);
      const hashToken = await bcrypt.hash(Date.now().toString(), salt);
      return new LoginResponseEntity({
        token: await this.signInDataProvider.createToken(user.getId, hashToken),
        user: new BaseUserWithIdEntity(user),
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  // TODO Add the token expire time
  // eslint-disable-next-line class-methods-use-this
  public async getUserWithRequiredData(user: DUser): Promise<BaseUserWithIdEntity> {
    return new BaseUserWithIdEntity(user);
  }

  public async createUser(data: SignupDto): Promise<BaseUserWithIdEntity | AccountServiceError> {
    const { name } = data;
    if (await this.signupDataProvider.isUserWithUsernameExist(name)) {
      return {
        code: AccountServiceErrorCode.UserWithSuchUsernameExist,
        message: 'User with such username exists',
      };
    }
    const user: DUser = await this.signupDataProvider.createUser(data);
    return new BaseUserWithIdEntity(user);
  }

  private async validateUserByUsernameAndPassword(username: string, password: string): Promise<DUser> {
    const user = await this.signInDataProvider.getUserByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordsCompare = await bcrypt.compare(password, <string>user.getPassword);
    if (!isPasswordsCompare) {
      throw new Error('Password not compare');
    }
    return user;
  }
}
