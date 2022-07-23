import { Exclude } from 'class-transformer';
import { DUser } from '@app/domains/models';

export default class BaseUserEntity {
  @Exclude()
  protected readonly password: string;

  @Exclude()
  protected readonly exist: boolean;

  protected readonly id: string;

  protected readonly login: string;

  protected readonly name: string;

  constructor(partial: DUser) {
    this.password = partial.password || '';
    this.exist = partial.exist;
    this.name = partial.name;
    this.id = partial.id;
    this.login = partial.login;
  }
}
