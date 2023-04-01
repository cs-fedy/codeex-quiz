import { IsBoolean, IsNotEmpty, IsString, IsUrl } from 'class-validator'

export default class RequestQuizApprovalArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'title is required' })
  @IsString()
  title: string

  @IsNotEmpty({ message: 'description is required' })
  @IsString()
  description: string

  @IsNotEmpty({ message: 'cover image url is required' })
  @IsUrl()
  coverImageURL: string

  @IsNotEmpty({ message: 'quiz visibility flag is required' })
  @IsBoolean()
  isVisible: boolean
}
