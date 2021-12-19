import { Controller } from '@nestjs/common';
import { ApiUserService } from './api-user.service';

@Controller('api-user')
export class ApiUserController {
  constructor(private apiUserService: ApiUserService) {}
}
