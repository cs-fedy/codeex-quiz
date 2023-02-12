import { IsNotEmpty, IsString } from 'class-validator'

export class LoginArgs {
  @IsNotEmpty({ message: 'username is required' })
  username: string

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string
}
