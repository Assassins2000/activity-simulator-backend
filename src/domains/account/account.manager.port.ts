import { DUser } from '../models/user.model';

export interface AccountManagerPort {
  isUserWithUsernameExist(username: string): Promise<boolean>;
  createUser(user: DUser, password: string): Promise<DUser>;
  getUserByUsername(username: string): Promise<DUser | null>;
}
