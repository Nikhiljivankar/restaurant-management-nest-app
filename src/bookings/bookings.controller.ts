import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Booking } from './schemas/booking.schema';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    createBookingDto.date = new Date(createBookingDto.date);
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'business_owner')
  findAll(@Query() query: ExpressQuery): Promise<Booking[]> {
    return this.bookingsService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'business_owner')
  findOne(@Param('id') id: string): Promise<Booking> {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto): Promise<Booking> {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
 
  // bellow two apia we can add sms email service to sent confirmation/cancellation  or for notification we can use firebase notification 
  @Patch('cancel/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'business_owner')
  async cancelBooking(@Param('id') bookingId: string) {
    return this.bookingsService.cancelBooking(bookingId);
  }

  @Patch('confirm/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'business_owner')
  async confirmBooking(@Param('id') bookingId: string) {
    return this.bookingsService.confirmBooking(bookingId);
  }
}
