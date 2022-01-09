import { Test } from '@nestjs/testing';
import { ApiAuthService } from './api-auth.service';

describe('ApiAuthService', () => {
  let service: ApiAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiAuthService],
    }).compile();

    service = module.get(ApiAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
