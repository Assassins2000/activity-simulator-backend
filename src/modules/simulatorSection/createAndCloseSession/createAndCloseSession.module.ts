import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, Session, SessionSchema } from '@app/schemas';
import { PassportModule } from '@nestjs/passport';
import { CreateAndCloseSessionController } from './createAndCloseSession.controller';
import { CloseSessionManagerDataProvider, CreateSessionManagerDataProvider } from './data';
import { CreateSessionService, CloseSessionService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Session.name, schema: SessionSchema },
    ]),
    PassportModule,
  ],
  controllers: [CreateAndCloseSessionController],
  providers: [
    CreateSessionService,
    CloseSessionService,
    CloseSessionManagerDataProvider,
    CreateSessionManagerDataProvider,
  ],
})
export class CreateAndCloseSessionModule {}
