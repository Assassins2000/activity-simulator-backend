import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export default class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user!: User;

  @Prop({ required: true })
  token!: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
