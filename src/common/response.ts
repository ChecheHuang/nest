import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface Data<T> {
  data: T
}

@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context: any, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => {
        return { data, statusCode: 200, message: ['success'], success: true }
      }),
    )
  }
}
