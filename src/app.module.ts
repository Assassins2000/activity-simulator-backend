import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@app/controllers/auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/activity'), AuthModule],
})
export class AppModule {}
