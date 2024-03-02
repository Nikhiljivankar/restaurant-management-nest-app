import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { Review } from './schemas/review.schema';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  create(@Body() createReviewDto: CreateReviewDto, @CurrentUser() user: User): Promise<Review> {
    return this.reviewsService.create(createReviewDto, user);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'business_owner')
  findAll(@Query() query: ExpressQuery): Promise<Review[]>{
    return this.reviewsService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'business_owner')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'business_owner')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto): Promise<Review> {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
