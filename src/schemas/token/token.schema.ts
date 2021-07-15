import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user!: User;

  @Prop({ required: true })
  key!: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
