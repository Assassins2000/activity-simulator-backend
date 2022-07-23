import { Injectable, Inject } from '@nestjs/common';
import { CreateSessionManagerPort } from '@app/domains/simulator/session/createSession.manager.port';
import { DSession, DUser } from '@app/domains/models';
import { BaseService } from '@app/sharedModules/base/base.service';
import { SessionServiceErrorCode } from '../constants';
import { UserHasActiveSessionsError } from '../types';
import { CreateSessionManagerDataProvider } from '../data';

@Injectable()
export class CreateSessionService extends BaseService {
  constructor(
    @Inject(CreateSessionManagerDataProvider) private readonly createSessionDataProvider: CreateSessionManagerPort,
  ) {
    super();
  }

  public async run(user: DUser): Promise<DSession | UserHasActiveSessionsError> {
    const isUserHasActiveSessions: boolean = await this.createSessionDataProvider.isUserHasActiveSessions(user);
    if (isUserHasActiveSessions) {
      return {
        code: SessionServiceErrorCode.UserHasActiveSessions,
        message: 'User has active sessions',
      };
    }
    return this.createSessionDataProvider.createSession(user);
  }
}
