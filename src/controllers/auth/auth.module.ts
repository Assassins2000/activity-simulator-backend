import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../auth/providers';
import { AuthProvider } from '@app/schemas/user/providers';
import { TokenProvider } from '@app/schemas/token/providers/token.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/schemas/user/user.schema';
import Token, { TokenSchema } from '@app/schemas/token/token.schema';
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
  providers: [AuthService, AuthProvider, TokenProvider],
})
export class AuthModule {}
