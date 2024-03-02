import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { UpdateAuthDto } from '../auth/dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { User } from '../auth/schemas/user.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  findAll(@Query() query: ExpressQuery): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'business_owner')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch('updateRole/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  updateRole(@Param('id') id: string, @Body() updateUserDto: UpdateAuthDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'business_owner')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateAuthDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
