import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAuthDto } from '../auth/dto/update-auth.dto';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(query: Query): Promise<User[]> {
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

    return await this.userModel
      .find(keyword)
      .limit(resultsPerPage)
      .skip(skip);
  }

  async findOne(id: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException(
        'Wrong mongoose ID Error. Please, enter the correct ID',
      );
    }

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateAuthDto): Promise<User> {
    let userData = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });
    console.log("user", userData)
    return userData;
  }

  async remove(id: string) {
    let data =  await this.userModel.findByIdAndDelete(id);
    if(data){
      return {message: "deleted successfully"};
    }else{
      throw new NotFoundException('Review not found');
    }
  }
}
