import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './schemas/menu.schema';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'business_owner')
  create(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'business_owner')
  findAll(@Query() query: ExpressQuery): Promise<Menu[]> {
    return this.menusService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'business_owner')
  findOne(@Param('id') id: string): Promise<Menu> {
    return this.menusService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'business_owner')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto): Promise<Menu> {
    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'business_owner')
  remove(@Param('id') id: string): Promise<Menu> {
    return this.menusService.remove(id);
  }
}
