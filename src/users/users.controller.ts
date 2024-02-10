import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body('name') createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.usersService.create(createUserDto)
  }

  @Get()
  @HttpCode(202)
  findAll(@Request() req, @Query() query, @Headers() headers) {
    console.log(req.query)
    console.log(query)
    console.log(headers)
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id)
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
