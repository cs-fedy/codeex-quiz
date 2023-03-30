import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export default class ConfirmEmailArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'confirmation code is required' })
  @IsNumber()
  confirmationCode: number
}
