import { HttpStatus } from '@nestjs/common'
import Either from 'src/utils/either'
import { QuizNotAvailable, QuizNotEnrolled, QuizNotFound } from 'src/utils/types'
import EnrolledQuizDTO from './enrolled-quizzes.dto'

export type EnrollQuizArgs = {
  userId: string
  quizId: string
}

type QuizAlreadyStarted = {
  code: 'quiz_already_started'
  status: HttpStatus.BAD_REQUEST
  message: string
}

export type EnrolledQuizResult = Either<
  QuizNotFound | QuizNotAvailable | QuizAlreadyStarted,
  EnrolledQuizDTO
>

export type ListEnrolledQuizzesResult = Either<never, Array<EnrolledQuizDTO>>

export type GetEnrolledQuizArgs = {
  quizId: string
  userId: string
}

export type GetEnrolledQuizResult = Either<QuizNotEnrolled, EnrolledQuizDTO>

export default interface IEnrolledQuizService {
  enrollQuiz(args: EnrollQuizArgs): Promise<EnrolledQuizResult>
  listEnrolledQuizzes(userId: string): Promise<ListEnrolledQuizzesResult>
  getEnrolledQuiz(args: GetEnrolledQuizArgs): Promise<GetEnrolledQuizResult>
}
