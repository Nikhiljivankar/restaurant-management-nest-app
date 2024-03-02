import * as dotenv from 'dotenv';
dotenv.config();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('NestJS API for Restaurant')
    .setDescription(
      'An REST API built with TypeScript and MongoDB, using the NestJS framework. This API is used to manage restaurants, menus and reviews, according to user authentication!.',
    )
    .setVersion('1.0')
    .addTag('restaurants')
    .addTag('auth')
    .addTag('menu')
    .addTag('review')
    .addTag('booking')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();