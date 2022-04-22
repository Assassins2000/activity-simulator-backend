import BaseUser from '../../baseEntities/baseUser.entity';

export interface LoginResponse {
  token: string;
  user: BaseUser;
}
