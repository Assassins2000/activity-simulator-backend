export class DUser {
  private exist = false;

  constructor(
    private readonly name: string,
    private readonly login: string,
    private readonly id?: string,
    private readonly password?: string,
  ) {
    if (id) {
      this.exist = true;
    } else {
      this.id = 'default';
    }
  }

  public get getName(): string {
    return this.name;
  }

  public get getLogin(): string {
    return this.login;
  }

  public get getId(): string {
    return <string>this.id;
  }

  public get getPassword(): string | null {
    return this.password ?? null;
  }
}
