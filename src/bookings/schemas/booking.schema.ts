import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

@Schema()
export class Booking extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  restaurantId: Types.ObjectId;

  @Prop({ required: true })
  @IsDate()
  date: Date;

  @Prop({ required: true })
  @IsString()
  time: string;

  @Prop({ required: true })
  @IsNumber()
  partySize: number;

  @Prop({ default: BookingStatus.PENDING, enum: BookingStatus })
  status: BookingStatus;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
