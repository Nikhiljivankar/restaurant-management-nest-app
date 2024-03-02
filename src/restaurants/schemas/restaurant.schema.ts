import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../auth/schemas/user.schema';
import { Menu  } from '../../menus/schemas/menu.schema';
import { Review } from '../../reviews/schemas/review.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Restaurant {
  @Prop({required: true})
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [String] }) 
  images: string[];

  @Prop({ unique: [true, 'Duplicated email entered'] })
  email: string;

  @Prop({required: true})
  phoneNo: string;

  @Prop()
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }])
  menu?: Menu[];

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);