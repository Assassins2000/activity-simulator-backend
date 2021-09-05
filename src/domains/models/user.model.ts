export class DUser {
  constructor(private id: string, private name: string, private login: string, private password?: string) {}

  public get getId(): string {
    return this.id;
  }

  public get getPassword(): string | null {
    return this.password ?? null;
  }
}
