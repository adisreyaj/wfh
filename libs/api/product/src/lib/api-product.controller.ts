import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { ProductRequest } from '@wfh/api-interfaces';

import { ApiProductService } from './api-product.service';

@Controller('products')
export class ApiProductController {
  constructor(private readonly productsService: ApiProductService) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get('autocomplete')
  autocomplete(@Query('query') query: string) {
    return this.productsService.autocomplete(query);
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.productsService.get(id);
  }

  @Post()
  create(@Body() productReq: ProductRequest) {
    return this.productsService.create(productReq);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() productReq: Partial<ProductRequest>) {
    return this.productsService.update(id, productReq);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
