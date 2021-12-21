import { Test, TestingModule } from '@nestjs/testing';
import { ApiCartService } from './api-cart.service';

describe('ApiCartService', () => {
  let service: ApiCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiCartService],
    }).compile();

    service = module.get<ApiCartService>(ApiCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
