import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export default class UpdateEmailArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'user password is required' })
  @IsString()
  userPassword: string

  @IsNotEmpty({ message: 'new email is required' })
  @IsEmail()
  newEmail: string
}
