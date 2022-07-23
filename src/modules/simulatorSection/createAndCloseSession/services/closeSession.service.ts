import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@app/sharedModules/base/base.service';
import { CloseSessionManagerPort } from '@app/domains/simulator/session/closeSession.manager.port';
import { CloseSessionManagerDataProvider } from '../data';

@Injectable()
export class CloseSessionService extends BaseService {
  constructor(
    @Inject(CloseSessionManagerDataProvider) private readonly closeSessionDataProvider: CloseSessionManagerPort,
  ) {
    super();
  }

  public async run(sessionId: string): Promise<boolean> {
    const dateTimeLastKeystroke: Date | null = await this.closeSessionDataProvider.findDateTimeLastKeyStrokeBySessionId(
      sessionId,
    );
    if (!dateTimeLastKeystroke) {
      throw Error();
    }
    return this.closeSessionDataProvider.closeSession(dateTimeLastKeystroke, sessionId);
  }
}
