import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private readonly reviewModel: Model<Review>) {}

  async create(createReviewDto: CreateReviewDto, user: any): Promise<Review> {
    console.log("create",createReviewDto)
    console.log("user",user)
    if (!createReviewDto.userId) {
      Object.assign(createReviewDto, { userId: user.id });
    }
    console.log(createReviewDto)
    const createdMenu = new this.reviewModel(createReviewDto);
    return createdMenu.save();
  }

  async findAll(query: Query): Promise<Review[]> {
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

    return await this.reviewModel
      .find(keyword)
      .limit(resultsPerPage)
      .skip(skip);
  }

  async findOne(id: string): Promise<Review> {
    const menu = await this.reviewModel.findById(id).exec();
    if (!menu) {
      throw new NotFoundException('Review not found');
    }
    return menu;
  }

  async update(id: string, updateMenuDto: UpdateReviewDto): Promise<Review> {
    const existingMenu = await this.reviewModel.findByIdAndUpdate(id, updateMenuDto, { new: true }).exec();
    if (!existingMenu) {
      throw new NotFoundException('Review not found');
    }
    return existingMenu;
  }

  async remove(id: string) {
    let data =  await this.reviewModel.findByIdAndDelete(id);
    if(data){
      return {message: "deleted successfully"};
    }else{
      throw new NotFoundException('Review not found');
    }
  }
}
