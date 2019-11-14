import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.interface';

@Controller('category')
export class CategoryController {

    constructor (private categoryService: CategoryService){};

    @Get()
    getCategories(): Promise<Category[]> {
        return this.categoryService.findAll();
        
    }

    // @Get()
    // getCategories(){
    //     return this.categoryService.findAll();
    // }

    @Get('findOne')
    getCategory(): Promise<Category[]>{
        return this.categoryService.findOne();

    }

   @Post()
   createData(@Body() category : Category){
       console.log(category);

   }


}
