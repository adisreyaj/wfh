import { Test } from '@nestjs/testing';
import { ApiUserController } from './api-user.controller';
import { ApiUserService } from './api-user.service';

describe('ApiUserController', () => {
  let controller: ApiUserController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUserService],
      controllers: [ApiUserController],
    }).compile();

    controller = module.get(ApiUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
