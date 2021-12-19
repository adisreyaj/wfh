import { Module } from '@nestjs/common';
import { ApiUserController } from './api-user.controller';
import { ApiUserService } from './api-user.service';

@Module({
  controllers: [ApiUserController],
  providers: [ApiUserService],
  exports: [ApiUserService],
})
export class ApiUserModule {}
