import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // constructor(private readonly jwtService: JwtService) {
  //   super();
  // }    

  // canActivate(context: ExecutionContext) {

  //   const req = context.switchToHttp().getRequest();
  //   const authHeader = req.headers.authorization;
  //   if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //     return false;
  //   }

  //   const token = authHeader.split(' ')[1];
  //   try {
  //     const payload = this.jwtService.verify(token);
  //     req.user = payload;
  //     return true;
  //   } catch (e) {
  //     console.log(e);
  //     return false;
  //   }
  // }
}
