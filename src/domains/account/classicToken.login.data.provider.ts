import { DUser } from '../models/user.model';

export interface ClassicTokenLoginDataProvider {
  getUserByUsername(username: string): Promise<DUser | null>;
  createToken(userId: string, hashToken: string): Promise<string>;
}
