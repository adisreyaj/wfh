import { Test } from '@nestjs/testing';
import { ApiBrandService } from './api-brand.service';

describe('ApiBrandService', () => {
  let service: ApiBrandService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiBrandService],
    }).compile();

    service = module.get(ApiBrandService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
