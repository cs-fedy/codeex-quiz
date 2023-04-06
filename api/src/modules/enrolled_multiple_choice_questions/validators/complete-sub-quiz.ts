import { Type } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export default class CompleteSubQuizArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  quizId: string

  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  subQuizId: string

  @IsNotEmpty({ message: 'user answer is required' })
  @Type(() => Array<number>)
  userAnswer: Array<number>
}
