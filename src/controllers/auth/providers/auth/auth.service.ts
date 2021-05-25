import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthProvider } from '@app/schemas/user/providers';
import { TokenProvider } from '@app/schemas/token/providers/token.provider';
import { UserDocument } from '@app/schemas/user/user.schema';
import { SignInDto } from '../../dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authProvider: AuthProvider, private readonly tokenProvider: TokenProvider) {}

  async validateUser(data: SignInDto): Promise<string> {
    const { username, password } = data;
    try {
      const user: UserDocument = await this.authProvider.validateUserByUsernameAndPassword(username, password);
      return await this.tokenProvider.createToken(user._id);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
