import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { LoginDataProvider } from '@app/controllers/account/data/login/login.data.provider';
import { SignupDataProvider } from '@app/controllers/account/data/signup/signup.data.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/schemas/user.schema';
import { Token, TokenSchema } from '@app/schemas/token.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
    PassportModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, LoginDataProvider, SignupDataProvider],
})
export class AccountModule {}
