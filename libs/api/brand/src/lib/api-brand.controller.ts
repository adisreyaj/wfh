import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBrandService } from './api-brand.service';
import { BrandRequest } from '@wfh/api-interfaces';

@Controller('brands')
export class ApiBrandController {
  constructor(private brandService: ApiBrandService) {}

  @Get('autocomplete')
  autocomplete(@Query('query') query: string) {
    return this.brandService.autocomplete(query);
  }

  @Get()
  getAll() {
    return this.brandService.getAll();
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.brandService.get(id);
  }

  @Post()
  create(@Body() brandReq: BrandRequest) {
    return this.brandService.create(brandReq);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() brandReq: Partial<BrandRequest>) {
    return this.brandService.update(id, brandReq);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.brandService.delete(id);
  }
}
