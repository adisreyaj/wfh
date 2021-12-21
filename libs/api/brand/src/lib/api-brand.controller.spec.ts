import { Test } from '@nestjs/testing';
import { ApiBrandController } from './api-brand.controller';
import { ApiBrandService } from './api-brand.service';

describe('ApiBrandController', () => {
  let controller: ApiBrandController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiBrandService],
      controllers: [ApiBrandController],
    }).compile();

    controller = module.get(ApiBrandController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
