import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type KeyDocument = Key & Document;

@Schema()
export class Key {
  @Prop({ required: true })
  public type!: string;

  @Prop({ required: true })
  public name!: string;
}

export const KeySchema = SchemaFactory.createForClass(Key);
