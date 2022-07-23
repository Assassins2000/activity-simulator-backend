import { DUser, DSession } from '../../models';

export interface CreateSessionManagerPort {
  createSession(user: DUser): Promise<DSession>;
  isUserHasActiveSessions(user: DUser): Promise<boolean>;
}
