import { Test } from '@nestjs/testing';
import { ApiProductController } from './api-product.controller';
import { ApiProductService } from './api-product.service';

describe('ApiProductController', () => {
  let controller: ApiProductController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiProductService],
      controllers: [ApiProductController],
    }).compile();

    controller = module.get(ApiProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
