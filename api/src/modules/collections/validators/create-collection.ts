import { IsBoolean, IsNotEmpty, IsString, IsUrl } from 'class-validator'

export default class CreateCollectionArgs {
  @IsNotEmpty({ message: 'creator id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'title is required' })
  @IsString()
  title: string

  @IsNotEmpty({ message: 'cover image url is required' })
  @IsUrl()
  coverImageURL: string

  @IsNotEmpty({ message: 'collection visibility flag is required' })
  @IsBoolean()
  isVisible: boolean
}
