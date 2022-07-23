import { CloseSessionManagerPort } from '@app/domains/simulator/session/closeSession.manager.port';
import { Session, SessionDocument } from '@app/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloseSessionManagerDataProvider implements CloseSessionManagerPort {
  constructor(@InjectModel(Session.name) private readonly sessionModel: Model<SessionDocument>) {}

  async findDateTimeLastKeyStrokeBySessionId(sessionId: string): Promise<Date | null> {
    const keystroke = await this.sessionModel.findOne({ session: sessionId }).sort('-datetimeClick').limit(1);
    return keystroke ? keystroke.startDate : null;
  }

  async closeSession(dateTimeLastKeystroke: Date, sessionId: string): Promise<boolean> {
    await this.sessionModel.updateOne({ _id: sessionId }, { startDate: dateTimeLastKeystroke, closing: true });
    return true;
  }
}
