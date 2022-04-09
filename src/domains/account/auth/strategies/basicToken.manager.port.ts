import { DUser } from '@app/domains/models/user.model';

export interface BasicTokenManagerPort {
  createToken(userId: string, hashToken: string): Promise<string>;
  getUserByToken(token: string): Promise<DUser | null>;
}
