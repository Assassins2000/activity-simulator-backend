import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type KeyDocument = Key & Document;

@Schema()
export class Key {
  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  name!: string;
}

export const KeySchema = SchemaFactory.createForClass(Key);
