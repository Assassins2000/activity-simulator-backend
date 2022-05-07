export class DUser {
  private readonly _exist: boolean = false;

  constructor(
    private readonly _name: string,
    private readonly _login: string,
    private readonly _id?: string,
    private readonly _password?: string,
  ) {
    if (_id) {
      this._exist = true;
    } else {
      this._id = 'default';
    }
  }

  public get name(): string {
    return this._name;
  }

  public get login(): string {
    return this._login;
  }

  public get id(): string {
    return <string>this._id;
  }

  public get password(): string | null {
    return this._password ?? null;
  }

  public get exist(): boolean {
    return this._exist;
  }
}
