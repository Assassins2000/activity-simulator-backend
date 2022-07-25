import { SessionServiceErrorCode } from '../constants/sessionServiceErrorCode.enum';
import { BaseServiceError } from '@app/sharedModules/base/baseServiceError.interface';

export type UserHasActiveSessionsError = BaseServiceError<SessionServiceErrorCode>;
