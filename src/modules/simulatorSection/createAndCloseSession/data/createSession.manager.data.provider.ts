import { CreateSessionManagerPort } from '@app/domains/simulator/session/createSession.manager.port';
import * as mongoose from 'mongoose';
import { DUser, DSession } from '@app/domains/models';
import { Session, SessionDocument } from '@app/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateSessionManagerDataProvider implements CreateSessionManagerPort {
  constructor(@InjectModel(Session.name) private readonly sessionModel: Model<SessionDocument>) {}

  public async isUserHasActiveSessions(user: DUser): Promise<boolean> {
    const userObjectId = new mongoose.Types.ObjectId(user.id);
    return this.sessionModel.exists({ user: userObjectId, closing: false });
  }

  public async createSession(user: DUser): Promise<DSession> {
    const userObjectId = new mongoose.Types.ObjectId(user.id);
    const startDate = new Date();
    const session = await this.sessionModel.create<Session>({
      user: userObjectId,
      startDate: new Date(),
      closing: false,
    });

    return new DSession(session.user.toString(), startDate);
  }
}
