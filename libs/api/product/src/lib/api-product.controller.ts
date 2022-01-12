import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { ProductRequest } from '@wfh/api-interfaces';

import { ApiProductService } from './api-product.service';
import { Internal, Public } from '@wfh/api/util';

@Controller('products')
export class ApiProductController {
  constructor(private readonly productsService: ApiProductService) {}

  @Public()
  @Get()
  getAll(@Query() query: any) {
    return this.productsService.getAll(query);
  }

  @Public()
  @Get('autocomplete')
  autocomplete(@Query('query') query: string) {
    return this.productsService.autocomplete(query);
  }

  @Public()
  @Get('/:id')
  get(@Param('id') id: string) {
    return this.productsService.get(id);
  }

  @Internal()
  @Post()
  create(@Body() productReq: ProductRequest) {
    return this.productsService.create(productReq);
  }

  @Internal()
  @Put('/:id')
  update(@Param('id') id: string, @Body() productReq: Partial<ProductRequest>) {
    return this.productsService.update(id, productReq);
  }

  @Internal()
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
