import { IsNotEmpty, IsString } from 'class-validator'

export default class StartSubQuizArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  quizId: string

  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  subQuizId: string
}
