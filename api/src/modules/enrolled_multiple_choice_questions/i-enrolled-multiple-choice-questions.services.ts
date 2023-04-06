import { HttpStatus } from '@nestjs/common'
import Either from 'src/utils/either'
import { QuizNotAvailable, QuizNotEnrolled, QuizNotFound, SubQuizNotFound } from 'src/utils/types'
import EnrolledMultipleChoiceQuestionDTO from './enrolled-multiple-choice-questions.dto'

export type StartSubQuizArgs = {
  userId: string
  quizId: string
  subQuizId: string
}

type InvalidSubQuiz = {
  code: 'invalid_sub_quiz'
  status: HttpStatus.BAD_REQUEST
  message: string
}

type PreviousSubQuizNotCompleted = {
  code: 'previous_sub_quiz_not_completed'
  status: HttpStatus.FORBIDDEN
  message: string
}

type SubQuizAlreadyStarted = {
  code: 'sub_quiz_already_started'
  status: HttpStatus.BAD_REQUEST
  message: string
}

export type StartSubQuizResult = Either<
  | QuizNotFound
  | QuizNotAvailable
  | QuizNotEnrolled
  | SubQuizNotFound
  | InvalidSubQuiz
  | SubQuizAlreadyStarted
  | PreviousSubQuizNotCompleted,
  EnrolledMultipleChoiceQuestionDTO
>

export default interface IEnrolledMultipleChoiceQuestionService {
  startSubQuiz(args: StartSubQuizArgs): Promise<StartSubQuizResult>
}
