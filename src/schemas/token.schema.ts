import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  public user!: mongoose.Types.ObjectId;

  @Prop({ required: true })
  public key!: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
