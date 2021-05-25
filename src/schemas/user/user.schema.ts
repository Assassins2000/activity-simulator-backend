import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  public name!: string;

  @Prop({ required: true })
  public login!: string;

  @Prop({ required: true })
  public password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
