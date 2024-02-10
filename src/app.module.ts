import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MyConfigModule } from './config/myConfig.module'
import { UsersModule } from './users/users.module'
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MyConfigModule.forRoot({ path: '/myConfigModule' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
