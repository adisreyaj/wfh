import { Test, TestingModule } from '@nestjs/testing';
import { ApiWishlistService } from './api-wishlist.service';

describe('ApiWishlistService', () => {
  let service: ApiWishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiWishlistService],
    }).compile();

    service = module.get<ApiWishlistService>(ApiWishlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
