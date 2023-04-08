import Either from 'src/utils/either'
import { NotQuizOwner, QuizNotFound, TopicNotFound } from 'src/utils/types'
import TopicQuizDTO from './topic-quizzes.dto'

export type AddTopicQuizArgs = {
  quizId: string
  topicId: string
  userId: string
}

export type AddTopicQuizResult = Either<QuizNotFound | NotQuizOwner | TopicNotFound, TopicQuizDTO>
export type ListTopicQuizzesResult = Either<TopicNotFound, Array<TopicQuizDTO>>

export default interface ITopicQuizService {
  addTopicQuiz(args: AddTopicQuizArgs): Promise<AddTopicQuizResult>
  listTopicQuizzes(topicId: string): Promise<ListTopicQuizzesResult>
}
