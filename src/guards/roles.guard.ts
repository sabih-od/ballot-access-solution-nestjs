import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { Reflector } from "@nestjs/core";
import { Request } from 'express';
import { UsersService } from "src/users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector, private jwtService: JwtService, private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    let IsAuthenticatedRole: any;

    if (!token) {
        throw new UnauthorizedException();
    }
    try {
        const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: jwtConstants.secret
            }
        );

        request['user'] = payload;

        if(payload?.sub) {
            const id = payload?.sub;
            IsAuthenticatedRole = this.usersService.findOneById(id).then((resp: any) => {
                // used for nultiple roles
                // return roles.some((role) => roles.includes(role));
                
                // used for single role
                return roles.includes(resp.modelHasRoles.roles.name);
            });
        }
    } catch {
        throw new UnauthorizedException();
    }

    return IsAuthenticatedRole;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}