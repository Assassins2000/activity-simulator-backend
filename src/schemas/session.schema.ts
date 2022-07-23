import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Document } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  public user!: mongoose.Types.ObjectId;

  @Prop({ required: true })
  public startDate!: Date;

  @Prop()
  public endDate?: Date;

  @Prop()
  public closing?: boolean = false;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
