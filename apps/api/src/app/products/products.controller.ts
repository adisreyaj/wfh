import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductRequest } from '@wfh/api-interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
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
