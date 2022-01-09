import { Test } from '@nestjs/testing';
import { ApiSearchService } from './api-search.service';

describe('ApiSearchService', () => {
  let service: ApiSearchService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiSearchService],
    }).compile();

    service = module.get(ApiSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
