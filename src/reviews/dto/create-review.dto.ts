import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'ID of the restaurant being reviewed' })
  @IsNotEmpty()
  @IsMongoId()
  restaurantId: string;

  @ApiProperty({ description: 'ID of the user who posted the review' })
  // @IsNotEmpty()
  // @IsMongoId()
  userId?: string;

  @ApiProperty({ description: 'Rating of the restaurant (between 1 and 5)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'Comment/review about the restaurant' })
  @IsString()
  comment: string;
}
