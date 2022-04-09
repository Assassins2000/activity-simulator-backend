import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Key, KeyDocument } from './key.schema';

export type KeystrokeDocument = Keystroke & Document;

@Schema()
export class Keystroke {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user!: UserDocument;

  @Prop({ required: true })
  type!: string;

  @Prop({ type: Types.ObjectId, ref: Key.name })
  key!: KeyDocument;

  @Prop()
  coordinateX!: number;

  @Prop()
  coordinateY!: number;

  @Prop({ required: true })
  pressedAt!: Date;
}
export const KeystrokeSchema = SchemaFactory.createForClass(Keystroke);