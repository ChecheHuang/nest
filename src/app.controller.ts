import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    @Inject('ABC') private readonly appService: AppService,
    @Inject('Test') private readonly shop: string[],
    @Inject('CCC') private readonly ccc: string,
  ) {}

  @Get()
  getHello(): string {
    console.log('this.ccc', this.ccc)
    console.log('this.shop', this.shop)
    return this.appService.getHello()
  }
}
