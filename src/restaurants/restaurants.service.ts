import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import { Query } from 'express-serve-static-core';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import APIFeatures from 'src/utils/apiFeatures.utils';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  async findAll(query: Query): Promise<Restaurant[]> {
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

    return await this.restaurantModel
      .find(keyword)
      .limit(resultsPerPage)
      .skip(skip);
  }

  async findById(id: string): Promise<Restaurant> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException(
        'Wrong mongoose ID Error. Please, enter the correct ID',
      );
    }

    const restaurant = await this.restaurantModel.findById(id).lean();

    if (!restaurant) throw new NotFoundException('Restaurant not found');

    return restaurant;
  }

  async create(
    restaurant: CreateRestaurantDto,
    user: any,
  ): Promise<Restaurant> {
    if (!restaurant.userId) {
      Object.assign(restaurant, { userId: user.id });
    }

    return await this.restaurantModel.create(restaurant);
  }

  async update(
    id: string,
    restaurant: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string) {
    let data =  await this.restaurantModel.findByIdAndDelete(id);
    if(data){
      return {message: "deleted successfully"};
    }else{
      throw new NotFoundException('Restaurant not found');
    }
  }

  async uploadImages(id: string, files: Array<Express.Multer.File>) {
    const images = await APIFeatures.upload(files);

    const restaurant = await this.restaurantModel.findByIdAndUpdate(
      id,
      {
        // eslint-disable-next-line @typescript-eslint/ban-types
        images: images as Object[],
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return restaurant;
  }

  async deleteImages(images): Promise<boolean> {
    const res = await APIFeatures.deleteImages(images);
    return res;
  }
}
