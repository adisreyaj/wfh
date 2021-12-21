import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CategoryRequest } from '@wfh/api-interfaces';

import { ApiCategoryService } from './api-category.service';

@Controller('categories')
export class ApiCategoryController {
  constructor(private categoryService: ApiCategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.categoryService.get(id);
  }

  @Get('autocomplete')
  autocomplete(@Query('query') query: string) {
    return this.categoryService.autocomplete(query);
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
