import BaseUserWithIdEntity from '@app/modules/baseEntities/baseUserWithId.entity';

export default class LoginResponseEntity {
  token!: string;
  user!: BaseUserWithIdEntity;

  constructor(partial: Partial<LoginResponseEntity>) {
    Object.assign(this, partial);
  }
}
