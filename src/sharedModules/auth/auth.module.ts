import { Module } from '@nestjs/common';
import { BasicTokenAuthProvider } from './strategies/basicToken/basicToken.auth.provider';
import BasicTokenManagerDataProvider from './strategies/basicToken/basicToken.manager.data.provider';
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
  providers: [BasicTokenAuthProvider, BasicTokenManagerDataProvider],
  exports: [BasicTokenManagerDataProvider, MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])],
})
export class AuthModule {}
