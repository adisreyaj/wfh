import { Test } from '@nestjs/testing';
import { ApiUserService } from './api-user.service';

describe('ApiUserService', () => {
  let service: ApiUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUserService],
    }).compile();

    service = module.get(ApiUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
