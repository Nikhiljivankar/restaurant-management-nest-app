import { ApiBody, ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { Menu } from '../../menus/schemas/menu.schema';
import { Review } from '../../reviews/schemas/review.schema';

export class UpdateRestaurantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  readonly Images: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please, enter a correct email format' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('IN')
  readonly phoneNo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty()
  readonly menu: Menu;

  @ApiProperty()
  readonly review: Review;

  @ApiProperty()
  @IsEmpty({ message: 'You cannot provide the user ID' })
  readonly user: User;
}