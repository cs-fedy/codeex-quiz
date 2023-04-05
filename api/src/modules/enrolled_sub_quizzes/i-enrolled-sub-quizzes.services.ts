import Either from 'src/utils/either'
import { QuizNotEnrolled, QuizNotFound } from 'src/utils/types'
import EnrolledSubQuizDTO from './enrolled-sub-quizzes.dto'

export type ListEnrolledSubQuizzesArgs = {
  quizId: string
  userId: string
}

export type ListEnrolledSubQuizzesResult = Either<
  QuizNotFound | QuizNotEnrolled,
  Array<EnrolledSubQuizDTO>
>

export default interface IEnrolledSubQuizService {
  listEnrolledSubQuizzes(args: ListEnrolledSubQuizzesArgs): Promise<ListEnrolledSubQuizzesResult>
}
