import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'

@Controller('jwt')
export class JwtController {
  @Get()
  @UseGuards(JwtAuthGuard)
  test(@Req() req: Request) {
    // console.log(req.user)
    return 'jwt test'
  }
}
