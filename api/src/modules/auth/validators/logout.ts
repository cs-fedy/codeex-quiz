import { IsNotEmpty, IsString } from 'class-validator'

export class LogoutArgs {
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNotEmpty()
  @IsString()
  accessToken: string

  @IsNotEmpty()
  @IsString()
  refreshToken: string
}
