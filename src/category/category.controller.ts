import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.interface';
import { CategoryTree } from './category-tree.interface';

@Controller('')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('tree')
  getCategoryTree(): Promise<CategoryTree> {
    return this.categoryService.findTree();
  }

  @Get('tree/:id')
  getCategoryTreeById(@Param('id') id: number): Promise<CategoryTree> {
    return this.categoryService.findTree(+id);
  }

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  getCategory(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(+id);
  }
}
