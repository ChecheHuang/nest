import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { LoggerMiddleware } from 'src/middleware/logger.middleware'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes(UsersController)
    // consumer.apply(LoggerMiddleware).forRoutes('users')
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'users',
      method: RequestMethod.GET,
    })
  }
}
