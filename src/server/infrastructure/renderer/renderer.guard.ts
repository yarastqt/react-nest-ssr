import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RendererGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routes = this.reflector.get<Set<string>>(
      'routes',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest<Request>();

    return routes.has(request.path);
  }
}
