import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Restaurant } from 'src/restaurants/schemas/restaurant.schema';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' })
  restaurantId: Restaurant;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  rating: number;

  @Prop()
  comment: string;

}

export const ReviewSchema = SchemaFactory.createForClass(Review);
