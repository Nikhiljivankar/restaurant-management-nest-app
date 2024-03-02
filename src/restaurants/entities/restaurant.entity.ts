// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import { Menu } from './menu.model';
// import { Review } from './review.model';

// export type RestaurantDocument = Restaurant & Document;

// @Schema()
// export class Restaurant {
//   @Prop()
//   name: string;

//   @Prop()
//   address: string;

//   @Prop([String])
//   features: string[];

//   @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Menu' }] })
//   menus: Menu[];

//   @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Review' }] })
//   reviews: Review[];
// }

// export const RestaurantModel = SchemaFactory.createForClass(Restaurant);
