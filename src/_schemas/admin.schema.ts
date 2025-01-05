import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ versionKey: false, timestamps: true })
export class Admin {
  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], enum: ['admin'], default: ['admin'] })
  roles: string[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);