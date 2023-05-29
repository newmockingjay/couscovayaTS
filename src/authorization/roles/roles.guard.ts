import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ApplicationConfig, Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { TheUser } from '../users/users.entity';
import { application } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    /*const request = context.switchToHttp().getRequest();
	const user = request.user;*/

	const { user } = context.switchToHttp().getRequest();
	console.log(context.switchToHttp().getRequest().req);

	// const ctx = GqlExecutionContext.create(context);
	// const user = ctx.getContext().req.user;
    // return requiredRoles.some((role) => user.roles?.includes(role));
	return requiredRoles.some((role) => user.roles === (role));
  }
}