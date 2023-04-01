import { IsNotEmpty, IsString } from 'class-validator'

export default class AddQuizArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  quizId: string

  @IsNotEmpty({ message: 'collection id is required' })
  @IsString()
  collectionId: string
}
