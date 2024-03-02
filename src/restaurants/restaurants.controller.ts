import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/schemas/user.schema';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'business_owner')
  async findAll(@Query() query: ExpressQuery): Promise<Restaurant[]> {
    return this.restaurantsService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'business_owner')
  async findById(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'business_owner')
  async create(
    @Body() restaurant: CreateRestaurantDto,
    @CurrentUser() user: User,
  ): Promise<Restaurant> {
    return this.restaurantsService.create(restaurant, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'business_owner')
  async update(
    @Param('id') id: string,
    @Body() restaurant: UpdateRestaurantDto,
    @CurrentUser() user: User,
  ): Promise<Restaurant> {
    const restaurantFound = await this.restaurantsService.findById(id);

    if (restaurantFound.userId.toString() == user.id.toString()  || user.role == "admin"){
      return this.restaurantsService.update(id, restaurant);
    }
    else{
    throw new ForbiddenException('You cannot update this restaurant.');
    }

  }

  @Put('upload/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'business_owner')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  async uploadFiles(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    await this.restaurantsService.findById(id);

    const res = await this.restaurantsService.uploadImages(id, files);
    return res;
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    try {
      const restaurant = await this.restaurantsService.findById(id);

      if (restaurant.images.length !== 0) {
        await this.restaurantsService.deleteImages(restaurant.images);
      }
      await this.restaurantsService.delete(id);
      return { deleted: true };
    } catch (error) {
      return { deleted: false };
    }
  }

}