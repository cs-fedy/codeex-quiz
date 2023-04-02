import Either from 'src/utils/either'
import { QuizAccessForbidden, QuizNotFound } from 'src/utils/types'
import SubQuizDTO from './sub-quizzes.dto'

export type ListQuizSubQuizzesArgs = {
  quizId: string
  userId: string
  isAdmin: boolean
}

export type ListQuizSubQuizzesResult = Either<QuizNotFound | QuizAccessForbidden, Array<SubQuizDTO>>

export default interface ISubQuizService {
  listQuizSubQuizzes(args: ListQuizSubQuizzesArgs): Promise<ListQuizSubQuizzesResult>
}
