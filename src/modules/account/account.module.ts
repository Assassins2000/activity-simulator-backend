import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountManagerDataProvider } from './data';
import { AuthModule } from '@app/sharedModules';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/schemas';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), PassportModule, AuthModule],
  controllers: [AccountController],
  providers: [AccountService, AccountManagerDataProvider],
})
export class AccountModule {}
