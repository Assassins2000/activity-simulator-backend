import { Exclude } from 'class-transformer';
import { DUser } from '@app/domains/models';

export default class BaseUserEntity {
  @Exclude()
  protected readonly password: string;

  @Exclude()
  protected readonly exist: boolean;

  @Exclude()
  private readonly id: string;

  protected readonly login: string;

  protected readonly name: string;

  constructor(partial: DUser) {
    this.id = partial.id;
    this.password = partial.password || '';
    this.exist = partial.exist;
    this.name = partial.name;
    this.login = partial.login;
  }
}
