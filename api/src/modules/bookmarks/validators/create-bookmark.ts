import { IsNotEmpty, IsString } from 'class-validator'

export default class CreateBookmarkArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'quiz id is required' })
  @IsString()
  quizId: string
}
