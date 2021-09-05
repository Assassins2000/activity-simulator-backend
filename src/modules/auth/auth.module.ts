import { Module } from '@nestjs/common';
import { ClassicTokenProvider } from './strategies/classicToken/classicToken.provider';
import ClassicTokenDataProvider from './strategies/classicToken/data/classicToken.data.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/schemas/user.schema';
import { Token, TokenSchema } from '@app/schemas/token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  providers: [ClassicTokenProvider, ClassicTokenDataProvider],
})
export class Auth1Module {}
