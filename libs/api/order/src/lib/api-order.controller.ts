import { Controller } from '@nestjs/common';
import { ApiOrderService } from './api-order.service';

@Controller('api-order')
export class ApiOrderController {
  constructor(private apiOrderService: ApiOrderService) {}
}
