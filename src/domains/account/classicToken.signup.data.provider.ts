import { DUser } from '../models/user.model';
import { SignupDto } from '@app/controllers/account/dto';

export interface ClassicTokenSignupDataProvider {
  isUserWithUsernameExist(username: string): Promise<boolean>;
  createUser(user: SignupDto): Promise<DUser>;
}
