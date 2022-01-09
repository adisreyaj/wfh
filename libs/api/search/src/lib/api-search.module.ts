import { Module } from '@nestjs/common';
import { ApiSearchService } from './api-search.service';
import { ApiProductModule } from '@wfh/api/product';
import { ApiSearchController } from './api-search.controller';

@Module({
  controllers: [ApiSearchController],
  providers: [ApiSearchService],
  exports: [ApiSearchService],
  imports: [ApiProductModule],
})
export class ApiSearchModule {}
