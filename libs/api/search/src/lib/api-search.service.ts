import { Injectable } from '@nestjs/common';
import { ApiProductService } from '@wfh/api/product';

@Injectable()
export class ApiSearchService {
  constructor(private readonly apiProductService: ApiProductService) {}

  search(filters: unknown, searchTerm: string) {
    return this.apiProductService.getAll(filters, searchTerm);
  }
}
