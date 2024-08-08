
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ type: [String], default: [] })
  blockedUsers: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
