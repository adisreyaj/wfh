import { Test } from '@nestjs/testing';
import { ApiOrderService } from './api-order.service';

describe('ApiOrderService', () => {
  let service: ApiOrderService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiOrderService],
    }).compile();

    service = module.get(ApiOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
