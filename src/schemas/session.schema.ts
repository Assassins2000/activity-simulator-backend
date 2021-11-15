import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Document } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user!: UserDocument;

  @Prop({ required: true })
  startDate!: Date;

  @Prop()
  endDate!: Date;

  @Prop()
  closing!: boolean;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
