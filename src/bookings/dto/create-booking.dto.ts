import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { BookingStatus } from '../schemas/booking.schema';

export class CreateBookingDto {
  @ApiProperty({ description: 'ID of the restaurant for the booking' })
  restaurantId: string;

  @ApiProperty({ description: 'Date of the booking' })
  @IsString()
  date: Date;

  @ApiProperty({ description: 'Time of the booking' })
  @IsString()
  time: string;

  @ApiProperty({ description: 'Number of people for the booking' })
  @IsNumber()
  partySize: number;

  @ApiProperty({ enum: BookingStatus, default: BookingStatus.PENDING, description: 'Status of the booking' })
  status: BookingStatus;
}
