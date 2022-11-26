import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '@app/schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AccountManagerPort } from '@app/domains/account/account.manager.port';
import { DUser } from '@app/domains/models';
import { UserMapper } from '../../../mappers/user.mapper';
import * as bcrypt from 'bcrypt';
import { SimpleOptionsEnum } from '@app/sharedModules';

@Injectable()
export class AccountManagerDataProvider implements AccountManagerPort {
  private readonly newDUserKeysConfig = {
    password: { options: [SimpleOptionsEnum.HideField] },
  };

  private readonly getUserKeysConfig = {
    __v: { options: [SimpleOptionsEnum.HideField] },
  };

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  public async createUser(user: DUser, password: string): Promise<DUser> {
    const salt = await bcrypt.genSalt(3);
    const hashPassword = await bcrypt.hash(password, salt);

    const userObj = new this.userModel(<User>{ name: user.name, password: hashPassword, login: user.login });
    await userObj.save();

    return new UserMapper(userObj.toObject(), this.newDUserKeysConfig).toDomainModel();
  }

  public async isUserWithUsernameExist(username: string): Promise<boolean> {
    return this.userModel.exists({ name: username });
  }

  public async getUserByUsername(username: string): Promise<DUser | null> {
    const user = await this.userModel.findOne({ login: username }).lean();
    if (!user) {
      return null;
    }
    return new UserMapper(user, this.getUserKeysConfig).toDomainModel();
  }
}
