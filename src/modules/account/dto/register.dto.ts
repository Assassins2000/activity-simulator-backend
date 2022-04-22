import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public login: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  constructor(name: string, login: string, password: string) {
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
