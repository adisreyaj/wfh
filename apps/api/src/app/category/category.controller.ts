import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryRequest } from '@wfh/api-interfaces';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.categoryService.get(id);
  }

  @Post()
  create(@Body() categoryReq: CategoryRequest) {
    return this.categoryService.create(categoryReq);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() categoryReq: Partial<CategoryRequest>) {
    return this.categoryService.update(id, categoryReq);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
