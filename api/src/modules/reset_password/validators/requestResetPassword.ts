import { IsEmail, IsNotEmpty } from 'class-validator'

export default class RequestResetPasswordArgs {
  @IsNotEmpty({ message: 'user email is required' })
  @IsEmail()
  userEmail: string
}
