// // review.model.ts
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import { Restaurant } from './restaurant.model';

// export type ReviewDocument = Review & Document;

// @Schema()
// export class Review {
//   @Prop({ type: Schema.Types.ObjectId, ref: 'Restaurant' })
//   restaurant: Restaurant;

//   @Prop()
//   userId: string;

//   @Prop()
//   rating: number;

//   @Prop()
//   comment: string;
// }

// export const ReviewModel = SchemaFactory.createForClass(Review);
