import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './schemas/menu.schema';
import { AuthModule } from 'src/auth/auth.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    AuthModule,
    RestaurantsModule
  ],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
