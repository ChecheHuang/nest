import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
//?在middleware之後之行，在piper跟interceptor之前執行
@Injectable()
export class GuardGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.reflector.get<string[]>('role', context.getHandler())
    const req = context.switchToHttp().getRequest<Request>()
    console.log(req.query.role)
    console.log(admin)
    return true
  }
}
