import { HttpStatus } from '@nestjs/common'
import Either from 'src/utils/either'
import { QuizNotAvailable, QuizNotFound } from 'src/utils/types'
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

export default interface IEnrolledQuizService {
  enrollQuiz(args: EnrollQuizArgs): Promise<EnrolledQuizResult>
}
