import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'

export default class UpdatePasswordArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'user password is required' })
  @IsString()
  userPassword: string

  @IsNotEmpty({ message: 'new password is required' })
  @IsStrongPassword()
  newPassword: string
}
