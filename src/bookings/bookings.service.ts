import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from '../bookings/schemas/booking.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

  create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const createdMenu = new this.bookingModel(createBookingDto);
    return createdMenu.save();
  }

  async findAll(query: Query): Promise<Booking[]> {
    //Pagination Logic

    //Defining how much result should be displayed per page
    const resultsPerPage = 5;
    //Getting the page passed in query
    const currentPage = Number(query.page) || 1;
    //Formula which defines how many results should be skipped
    const skip = resultsPerPage * (currentPage - 1);

    //Search Logic
    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    return await this.bookingModel
      .find(keyword)
      .limit(resultsPerPage)
      .skip(skip);
  }

  async findOne(id: string): Promise<Booking> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException(
        'Wrong mongoose ID Error. Please, enter the correct ID',
      );
    }

    const booking = await this.bookingModel.findById(id);

    if (!booking) throw new NotFoundException('Booking not found');

    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const existingMenu = await this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true }).exec();
    if (!existingMenu) {
      throw new NotFoundException('Booking not found');
    }
    return existingMenu;
  }

  async remove(id: string) {
    let data =  await this.bookingModel.findByIdAndDelete(id);
    if(data){
      return {message: "deleted successfully"};
    }else{
      throw new NotFoundException('Booking not found');
    }
  }

  async cancelBooking(bookingId: string): Promise<Booking | null> {
    const cancelledBooking = await this.bookingModel.findByIdAndUpdate(bookingId, { status: 'cancelled' }, { new: true });
    if (!cancelledBooking) {
      throw new NotFoundException('Booking not found');
    }
    return cancelledBooking;
  }

  async confirmBooking(bookingId: string): Promise<Booking | null> {
    const confirmedBooking = await this.bookingModel.findByIdAndUpdate(bookingId, { status: 'confirmed' }, { new: true });
    if (!confirmedBooking) {
      throw new NotFoundException('Booking not found');
    }
    return confirmedBooking;
  }
}
