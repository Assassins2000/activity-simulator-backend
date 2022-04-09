import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from '@app/modules/account/account.module';
import { AuthModule } from '@app/sharedModules/auth/auth.module';
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
