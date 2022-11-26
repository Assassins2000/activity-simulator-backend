import { BaseMapper } from '@app/sharedModules/base/base.mapper';
import { DUser } from '@app/domains/models';

export class UserMapper extends BaseMapper<DUser> {
  public toDomainModel(): DUser {
    const { _id, login, name, password } = this.originalObject as {
      _id: string;
      login: string;
      name: string;
      password?: string;
    };

    return new DUser(name, login, password, _id);
  }
}
