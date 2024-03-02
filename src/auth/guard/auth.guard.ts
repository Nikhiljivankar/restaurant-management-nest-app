import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import ErrorHandler from 'src/helper/error-handler/error-handler';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers?.authorization;

      if (!authHeader) {
        return false;
      }

      const [bearer, token] = authHeader?.split(' ');

      if (bearer && bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }

      req.user = token && this.jwtService.verify(token);

      return true;
    } catch (e) {
      new ErrorHandler(e, 'AuthGuard canActivate');
    }
  }
}
