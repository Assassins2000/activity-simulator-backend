import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '@app/schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AccountManagerPort } from '@app/domains/account/account.manager.port';
import { DUser } from '@app/domains/models';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountManagerDataProvider implements AccountManagerPort {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  public async createUser(user: DUser, password: string): Promise<DUser> {
    const salt = await bcrypt.genSalt(3);
    const hashPassword = await bcrypt.hash(password, salt);

    const userObj = new this.userModel(<User>{ name: user.name, password: hashPassword, login: user.login });
    await userObj.save();

    return new DUser(userObj.name, userObj.login, userObj._id);
  }

  public async isUserWithUsernameExist(username: string): Promise<boolean> {
    return this.userModel.exists({ name: username });
  }

  public async getUserByUsername(username: string): Promise<DUser | null> {
    const user = await this.userModel.findOne({ login: username }).lean();
    if (!user) {
      return null;
    }
    return new DUser(user.name, user.login, user._id.toString(), user.password);
  }
}
