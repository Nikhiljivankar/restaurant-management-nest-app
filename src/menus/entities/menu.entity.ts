// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document } from 'mongoose';
// import { Restaurant } from './restaurant.model';

// export type MenuDocument = Menu & Document;

// @Schema()
// export class Menu {
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' })
//   restaurant: Restaurant;

//   @Prop({ type: [{ name: String, price: Number }] })
//   items: { name: string; price: number }[];
// }

// export const MenuModel = SchemaFactory.createForClass(Menu);
