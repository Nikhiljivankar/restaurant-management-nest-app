import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    AuthModule
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
