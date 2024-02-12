import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { Prisma } from '@prisma/client'

type CreateDTO = Prettify<Prisma.UserCreateInput>
type UpdateDTO = Prettify<Prisma.UserUpdateInput>

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateDTO) {
    return this.databaseService.user.create({
      data: createUserDto,
    })
  }

  async findAll() {
    return this.databaseService.user.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    })
  }

  async update(id: number, updateUserDto: UpdateDTO) {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    })
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      },
    })
  }
}
