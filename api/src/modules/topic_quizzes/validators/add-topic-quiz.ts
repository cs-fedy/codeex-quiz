import { IsNotEmpty, IsString } from 'class-validator'

export default class AddTopicQuizArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'quiz id is required' })
  @IsString()
  quizId: string

  @IsNotEmpty({ message: 'topic id is required' })
  @IsString()
  topicId: string
}
