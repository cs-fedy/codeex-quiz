import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'

export default class RegisterArgs {
  @IsEmail()
  email: string

  @IsStrongPassword()
  password: string

  @IsNotEmpty({ message: 'full name is required' })
  @IsString()
  fullName: string

  @IsNotEmpty({ message: 'username is required' })
  @IsString()
  username: string
}
