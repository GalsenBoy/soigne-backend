import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    matchRoles(roles: string[], userRoles: string) {
        return roles.some(role => userRoles.includes(role));
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return this.matchRoles(roles, user.roles);
        // const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        //     context.getHandler(),
        //     context.getClass(),
        // ]);
        // if (!requiredRoles) {
        //     return true;
        // }
        // const { user } = context.switchToHttp().getRequest();
        // return requiredRoles.some((role) => user.roles?.includes(role));
    }
}