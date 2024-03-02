// menu.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Restaurant } from 'src/restaurants/schemas/restaurant.schema';

export type MenuDocument = Menu & Document;

export enum Category {
  DINNER = 'Dinner',
  LUNCH = 'Lunch',
}

@Schema({
  timestamps: true,
})
export class Menu {
  @Prop()
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' })
  restaurant: Restaurant;

  @Prop({ type: [{ name: String, price: Number }] })
  items: { name: string; price: number }[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
