import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
  applyDecorators,//把所有裝飾器組合起來
} from '@nestjs/common'
import { Request } from 'express'

export const Role = (...args: string[]) => SetMetadata('role', args)

export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>()
    console.log(data, 'decorator')
    return req.url
  },
)
