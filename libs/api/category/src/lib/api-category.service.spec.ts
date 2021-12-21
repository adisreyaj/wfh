import { Test } from '@nestjs/testing';
import { ApiCategoryService } from './api-category.service';

describe('ApiCategoryService', () => {
  let service: ApiCategoryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiCategoryService],
    }).compile();

    service = module.get(ApiCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
