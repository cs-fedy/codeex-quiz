import Either from 'src/utils/either'
import { QuizNotAvailable, QuizNotFound } from 'src/utils/types'
import QuizDTO from './quizzes.dto'

export type GetQuizArgs = {
  userId: string
  quizId: string
}

export type GetQuizResult = Either<QuizNotFound | QuizNotAvailable, QuizDTO>

export type ListCreatorQuizzesArgs = {
  userId: string
  creator: string
}

export type ListCreatorQuizzesResult = Either<never, Array<QuizDTO>>

export default interface IQuizService {
  getQuiz(args: GetQuizArgs): Promise<GetQuizResult>
  listCreatorQuizzes(args: ListCreatorQuizzesArgs): Promise<ListCreatorQuizzesResult>
}
