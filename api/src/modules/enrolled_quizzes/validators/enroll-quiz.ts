import { IsNotEmpty, IsString } from 'class-validator'

export default class EnrollQuizArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'quiz id is required' })
  @IsString()
  quizId: string
}
