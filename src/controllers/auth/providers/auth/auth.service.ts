import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { SignInDataProvider } from '../data/signin/signin.data.provider';
import BaseUserWithIdEntity from '@app/controllers/baseEntities/baseUserWithId.entity';
import LoginResponseEntity from '@app/controllers/auth/entities/loginReponseEntity';
import { SignInDto } from '../../dto/signIn.dto';
import { DUser } from '@app/domains/models/user.model';
import { ClassicTokenSignInDataProvider } from '@app/domains/auth/classic-token/classic-token.signin.data.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject(SignInDataProvider.name) private readonly signInDataProvider: ClassicTokenSignInDataProvider) {}

  public async validateUser(data: SignInDto): Promise<LoginResponseEntity> {
    const { username, password } = data;
    try {
      const user = await this.validateUserByUsernameAndPassword(username, password);
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

  private async validateUserByUsernameAndPassword(username: string, password: string): Promise<DUser> {
    const user = await this.signInDataProvider.getUserByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordsCompare = await bcrypt.compare(password, user.getPassword);
    if (!isPasswordsCompare) {
      throw new Error('Password not compare');
    }
    return user;
  }
}
