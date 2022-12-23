import { CanActivate, ExecutionContext } from '@nestjs/common';

export class SitterGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) {
      return false;
    }
    if (request.currentUser.role !== 'sitter') {
      return false;
    }
    return true;
  }
}
