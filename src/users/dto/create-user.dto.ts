import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: '$property must be a string' })
  @Length(4, 10, {
    message: '$property must be between $constraint1 and $constraint2',
  })
  name: string
  @IsNumber()
  age: number
}
