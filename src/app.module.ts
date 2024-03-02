import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BookingsModule } from './bookings/bookings.module';
import { MenusModule } from './menus/menus.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI ||'mongodb://localhost/restaurant-listing'),
    RestaurantsModule,
    MenusModule,
    BookingsModule,
    ReviewsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
