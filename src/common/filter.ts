import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const errors = exception.getResponse()
    const message = exception.message
    response.status(status).json({
      success: false,
      time: new Date(),
      data: message,
      statusCode: status,
      path: request.url,
      errors,
    })
  }
}
