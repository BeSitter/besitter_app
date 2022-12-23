import { CanActivate, ExecutionContext } from '@nestjs/common';

export class ClientGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) {
      return false;
    }
    if (request.currentUser.role !== 'client') {
      return false;
    }
    return true;
  }
}
