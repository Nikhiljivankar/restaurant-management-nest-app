// menus.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Menu, MenuDocument } from './schemas/menu.schema';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Query } from 'express-serve-static-core';
import { Restaurant } from 'src/restaurants/schemas/restaurant.schema';

@Injectable()
export class MenusService {
  constructor(@InjectModel(Menu.name) private menuModel: Model<Menu>,
  @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const createdMenu = new this.menuModel(createMenuDto);
    let createdData =  await createdMenu.save();
     await this.restaurantModel.findByIdAndUpdate(createdData.restaurant,{
      $push: { menu: createdData._id },
    },{new: true})
    return createdData;
  }

  async findAll(query: Query): Promise<Menu[]> {
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

    return await this.menuModel
      .find(keyword)
      .limit(resultsPerPage)
      .skip(skip);
  }

  async findOne(id: string): Promise<Menu>  {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException(
        'Wrong mongoose ID Error. Please, enter the correct ID',
      );
    }

    const menu = await this.menuModel.findById(id);

    if (!menu) throw new NotFoundException('Menu not found');

    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu>  {
    const existingMenu = await this.menuModel.findByIdAndUpdate(id, updateMenuDto, { new: true });
    if (!existingMenu) {
      throw new NotFoundException('Menu not found');
    }
    if(updateMenuDto["restaurant"] != JSON.parse(JSON.stringify(existingMenu.restaurant))){
      await this.restaurantModel.findByIdAndUpdate(existingMenu.restaurant,{
        $push: { menu: existingMenu._id },
      },{new: true})
    }
    return existingMenu;
  }

  async remove(id: string): Promise<Menu> {
    let menuData = await this.menuModel.findById(id);
    if (!menuData) {
      throw new NotFoundException('Menu not found');
    }
    await this.restaurantModel.findByIdAndUpdate(menuData.restaurant,{
      $pull: { menu: menuData._id },
    },{new: true})
    return this.menuModel.findByIdAndDelete(id);
  }
}
