import { Controller } from '@nestjs/common';
import { ApiProductService } from './api-product.service';

@Controller('api-product')
export class ApiProductController {
  constructor(private apiProductService: ApiProductService) {}
}
