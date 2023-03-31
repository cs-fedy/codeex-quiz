import { IsEmail, IsNotEmpty, IsNumber, IsStrongPassword } from 'class-validator'

export default class ResetPasswordArgs {
  @IsNotEmpty({ message: 'new password is required' })
  @IsStrongPassword()
  newPassword: string

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string

  @IsNotEmpty({ message: 'code is required' })
  @IsNumber()
  code: number
}
