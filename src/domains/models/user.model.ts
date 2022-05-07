import { DBaseModel } from './base.model';

export class DUser extends DBaseModel {
  constructor(
    private readonly _name: string,
    private readonly _login: string,
    private readonly _password?: string,
    id?: string,
  ) {
    super(id);
  }

  public get name(): string {
    return this._name;
  }

  public get login(): string {
    return this._login;
  }

  public get password(): string | null {
    return this._password ?? null;
  }
}
