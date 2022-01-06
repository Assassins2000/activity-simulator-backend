import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from '@app/controllers/account/account.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { ConfigurationModule, ConfigurationService } from '@app/configuration';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigurationService) => ({
        uri: configService.mongoURI,
      }),
      inject: [ConfigurationService],
    }),
    AccountModule,
    AuthModule,
  ],
})
export class AppModule {}
