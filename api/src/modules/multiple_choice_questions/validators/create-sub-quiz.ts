import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export default class CreateSubQuizArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'sub quiz id is required' })
  @IsString()
  subQuizId: string

  @IsNotEmpty({ message: 'quiz id is required' })
  @IsString()
  quizId: string

  @IsNotEmpty({ message: 'title is required' })
  @IsString()
  title: string

  @IsNotEmpty({ message: 'options is required' })
  @Type(() => Array<string>)
  options: Array<string>

  @IsNotEmpty({ message: 'ideal options is required' })
  @Type(() => Array<number>)
  idealOptions: Array<number>

  @IsUrl()
  coverImageURL?: string
}
