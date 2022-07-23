import { SessionServiceErrorCode } from '../constants/sessionServiceErrorCode.enum';

export type UserHasActiveSessionsError = BaseServiceError<SessionServiceErrorCode>;
