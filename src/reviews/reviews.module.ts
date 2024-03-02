import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review, ReviewSchema } from './schemas/review.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({ imports: [
  MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  AuthModule
],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
