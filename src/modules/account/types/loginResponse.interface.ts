import BaseUser from '../../../sharedModules/baseEntities/baseUser.entity';

export interface LoginResponse {
  token: string;
  user: BaseUser;
}
