import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, IsUrl, Max, Min } from 'class-validator'

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

  @IsNotEmpty({ message: 'ideal option is required' })
  @IsNumber()
  idealOption: number

  @IsNotEmpty({ message: 'quiz points is required' })
  @IsNumber()
  points: number

  @IsNotEmpty({ message: 'time limit is required' })
  @IsNumber()
  timeLimit: number

  @IsNotEmpty({ message: 'sub quiz dificulity is required' })
  @IsNumber()
  @Min(1)
  @Max(3)
  dificulity: number

  @IsUrl()
  coverImageURL?: string
}
