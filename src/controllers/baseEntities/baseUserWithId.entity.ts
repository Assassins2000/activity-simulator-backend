import { Exclude, Transform } from 'class-transformer';
import { DUser } from '@app/domains/models/user.model';

export default class BaseUserWithIdEntity {
  @Exclude()
  password!: string;

  constructor(partial: DUser) {
    Object.assign(this, partial);
  }
}
