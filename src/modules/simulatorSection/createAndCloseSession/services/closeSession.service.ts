import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@app/sharedModules/base/base.service';
import { CloseSessionManagerPort } from '@app/domains/simulator/session/closeSession.manager.port';
import { CloseSessionManagerDataProvider } from '../data';
import { ServiceErrorCode } from '../../constants/serviceErrorCode.enum';
import { BaseServiceError } from '@app/sharedModules/base/types/baseServiceError.interface';

@Injectable()
export class CloseSessionService extends BaseService {
  constructor(
    @Inject(CloseSessionManagerDataProvider) private readonly closeSessionDataProvider: CloseSessionManagerPort,
  ) {
    super();
  }

  public async run(sessionId: string): Promise<boolean | BaseServiceError<ServiceErrorCode>> {
    const dateTimeLastKeystroke: Date | null = await this.closeSessionDataProvider.findDateTimeLastKeyStrokeBySessionId(
      sessionId,
    );
    if (!dateTimeLastKeystroke) {
      return {
        code: ServiceErrorCode.KeystrokeNotFound,
        message: 'No clicks have been saved in this session',
      };
    }
    return this.closeSessionDataProvider.closeSession(dateTimeLastKeystroke, sessionId);
  }
}
