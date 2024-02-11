import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the guard' })
  name: string

  @ApiProperty({ example: 30, description: 'The age of the guard' })
  age: number
}
