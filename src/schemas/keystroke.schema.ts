import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Key } from './key.schema';
import { Session } from './session.schema';

export type KeystrokeDocument = Keystroke & Document;

@Schema()
export class Keystroke {
  @Prop({ required: true })
  public type!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Key.name })
  public key!: mongoose.Types.ObjectId;

  @Prop()
  public coordinateX!: number;

  @Prop()
  public coordinateY!: number;

  @Prop({ required: true })
  public pressedAt!: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Session.name, required: true })
  public session!: mongoose.Types.ObjectId;
}
export const KeystrokeSchema = SchemaFactory.createForClass(Keystroke);
