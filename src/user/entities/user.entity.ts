// user.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Roles } from '../../enums/roles.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ select: false })
  password: string;

  @Prop({ unique: [true, 'Duplicated email entered'] })
  email: string;

  @Prop()
  mobile: number;

  @Prop({
    enum: Roles,
    default: Roles.USER,
  })
  roles: Roles;
}

export const UserModel = SchemaFactory.createForClass(User);
