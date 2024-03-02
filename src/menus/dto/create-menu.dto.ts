// menu.dto.ts
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Category } from '../schemas/menu.schema';

export class MenuItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class CreateMenuDto {
  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;

  @IsNotEmpty()
  @IsMongoId()
  restaurant: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MenuItemDto)
  items: MenuItemDto[];
}
