import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from '@app/controllers/account/account.module';
import { AuthModule } from '@app/modules/auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/activity'), AccountModule, AuthModule],
})
export class AppModule {}
