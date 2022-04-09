import { Exclude } from 'class-transformer';
import { DUser } from '@app/domains/models';

export default class BaseUserWithIdEntity {
  @Exclude()
  password!: string;

  constructor(partial: DUser) {
    Object.assign(this, partial);
  }
}
