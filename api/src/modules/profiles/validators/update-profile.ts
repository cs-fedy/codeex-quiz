import { IsDate, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator'

export default class UpdateProfileArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsString()
  firstName?: string

  @IsString()
  lastName?: string

  @IsUrl()
  avatarURL?: string

  @IsString()
  jobTitle?: string

  @IsDate()
  birthDate?: Date

  @IsString()
  phoneNumber?: string

  @IsString()
  address?: string

  @IsUrl()
  addressDocURL?: string

  @IsUrl()
  identityCardDocURL?: string

  @IsNumber()
  identityCardNumber?: number
}
