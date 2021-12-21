import { Test } from '@nestjs/testing';
import { ApiProductService } from './api-product.service';

describe('ApiProductService', () => {
  let service: ApiProductService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiProductService],
    }).compile();

    service = module.get(ApiProductService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
