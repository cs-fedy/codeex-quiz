import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

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
  @IsBoolean()
  userAnswer: boolean
}
