import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppService2 } from './app.service2'
import { UsersModule } from './users/users.module'
@Module({
  imports: [ConfigModule.forRoot(), UsersModule],
  controllers: [AppController],
  providers: [
    AppService2,
    {
      provide: 'ABC',
      useClass: AppService,
    },
    {
      provide: 'Test',
      useValue: ['test1', 'test2'],
    },
    {
      provide: 'CCC',
      inject: [AppService2],
      async useFactory(AppService2: AppService2) {
        console.log(AppService2.getHello())
        return await new Promise((resolve) => resolve(AppService2.getHello()))
      },
    },
  ],
})
export class AppModule {}
