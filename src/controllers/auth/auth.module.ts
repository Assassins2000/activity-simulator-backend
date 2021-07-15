import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../auth/providers';
import { SignInDataProvider } from '@app/controllers/auth/providers';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/schemas/user/user.schema';
import { Token, TokenSchema } from '@app/schemas/token/token.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, SignInDataProvider],
})
export class AuthModule {}
