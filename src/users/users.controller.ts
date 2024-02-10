import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  Session,
} from '@nestjs/common'
import { Response } from 'express'
import * as svgCaptcha from 'svg-captcha'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body, @Session() session) {
    if (body.code.toUpperCase() !== session['code'].toUpperCase()) {
      return 'captcha error'
    }
    return this.usersService.create(body)
  }

  @Get()
  createCode(@Res() res: Response, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0oO1ilI',
      noise: 2,
      color: true,
      background: '#cc9966',
      width: 100,
      height: 40,
      fontSize: 50,
      charPreset: '0123456789',
    })
    session['code'] = captcha.text

    res.type('image/svg+xml')
    res.status(200).send(captcha.data)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
