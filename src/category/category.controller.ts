import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.interface';
import { CategoryTree } from './category-tree.interface';

@Controller('')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('/tree')
  getCategoryTree(): Promise<CategoryTree> {
    return this.categoryService.findOne();
  }

  @Get(':id')
  getCategory(@Param() id: number): Promise<CategoryTree> {
    return this.categoryService.findOne(+id);
  }
}
