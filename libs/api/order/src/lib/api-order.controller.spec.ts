import { Test } from '@nestjs/testing';
import { ApiOrderController } from './api-order.controller';
import { ApiOrderService } from './api-order.service';

describe('ApiOrderController', () => {
  let controller: ApiOrderController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiOrderService],
      controllers: [ApiOrderController],
    }).compile();

    controller = module.get(ApiOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
