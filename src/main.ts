import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import ConfigurationService from './configuration/confogiration.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get<ConfigurationService>(ConfigurationService);
  await app.listen(configService.serverPort);
}
bootstrap();
