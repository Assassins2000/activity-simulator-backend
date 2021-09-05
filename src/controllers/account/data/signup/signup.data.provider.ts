import { Injectable } from '@nestjs/common';
import { User } from '@app/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClassicTokenSignupDataProvider } from '@app/domains/account/classicToken.signup.data.provider';
import { SignupDto } from '@app/controllers/account/dto';
import { DUser } from '@app/domains/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignupDataProvider implements ClassicTokenSignupDataProvider {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async createUser(user: SignupDto): Promise<DUser> {
    const { name, login, password } = user;

    const salt = await bcrypt.genSalt(3);
    const hashPassword = await bcrypt.hash(password, salt);

    const userObj = new this.userModel(<User>{ name, password: hashPassword, login });
    await userObj.save();

    return new DUser(userObj.id, userObj.name, userObj.login);
  }

  public async isUserWithUsernameExist(username: string): Promise<boolean> {
    return this.userModel.exists({ name: username });
  }
}
