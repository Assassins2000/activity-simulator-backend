export abstract class DBaseModel {
  private readonly _exist: boolean = false;

  constructor(private readonly _id?: string) {
    if (_id) {
      this._exist = true;
    } else {
      this._id = 'default';
    }
  }

  public get id(): string {
    return <string>this._id;
  }

  public get exist(): boolean {
    return this._exist;
  }
}
