import { Controller, Get, Query } from '@nestjs/common';
import { ApiSearchService } from './api-search.service';
import { Public } from '@wfh/api/util';

@Controller('search')
export class ApiSearchController {
  constructor(private searchService: ApiSearchService) {}

  @Public()
  @Get('')
  search(@Query() query: { query: string; [key: string]: string }) {
    const { query: searchTerm, ...filters } = query;
    return this.searchService.search(filters, searchTerm);
  }
}
