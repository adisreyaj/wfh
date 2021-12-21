import { Test } from '@nestjs/testing';
import { ApiCategoryController } from './api-category.controller';
import { ApiCategoryService } from './api-category.service';

describe('ApiCategoryController', () => {
  let controller: ApiCategoryController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiCategoryService],
      controllers: [ApiCategoryController],
    }).compile();

    controller = module.get(ApiCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
