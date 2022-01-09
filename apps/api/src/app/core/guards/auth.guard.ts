import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@wfh/api/util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  constructor(private reflector: Reflector, private cfg: ConfigService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // Internal seeding and other scripts should be allowed to run without auth
    const internalToken = this.cfg.get('INTERNAL_TOKEN') ?? '';
    const internalTokenPresent =
      context.switchToHttp().getRequest().headers['x-internal-token'] ?? null;
    if (isPublic || internalTokenPresent === internalToken) {
      return true;
    }
    return super.canActivate(context);
  }
}
