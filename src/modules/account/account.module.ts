import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountManagerDataProvider } from '@app/modules/account/data/accountManager/account.manager.data.provider';
import BasicTokenManagerDataProvider from '@app/sharedModules/auth/strategies/basicToken/basicToken.manager.data.provider';
import { AuthModule } from '@app/sharedModules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/schemas/user.schema';
import { Token, TokenSchema } from '@app/schemas/token.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), PassportModule, AuthModule],
  controllers: [AccountController],
  providers: [AccountService, AccountManagerDataProvider],
})
export class AccountModule {}
