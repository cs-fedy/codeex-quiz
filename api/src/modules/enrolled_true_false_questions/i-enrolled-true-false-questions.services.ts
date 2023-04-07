import Either from 'src/utils/either'
import {
  InvalidSubQuiz,
  PreviousSubQuizNotCompleted,
  QuizNotAvailable,
  QuizNotEnrolled,
  QuizNotFound,
  SubQuizAlreadyStarted,
  SubQuizNotFound,
  SubQuizNotStarted,
} from 'src/utils/types'
import EnrolledTrueFalseQuestionDTO from './enrolled-true-false-questions.dto'

export type StartSubQuizArgs = {
  userId: string
  quizId: string
  subQuizId: string
}

export type StartSubQuizResult = Either<
  | QuizNotFound
  | QuizNotAvailable
  | QuizNotEnrolled
  | SubQuizNotFound
  | InvalidSubQuiz
  | SubQuizAlreadyStarted
  | PreviousSubQuizNotCompleted,
  EnrolledTrueFalseQuestionDTO
>

export type CompleteSubQuizArgs = {
  userId: string
  quizId: string
  subQuizId: string
  userAnswer: boolean
}

type CompleteSubQuizPayload =
  | { answerCorrectness: true }
  | {
      answerCorrectness: false
      userAnswer: boolean
      expectedAnswer: boolean
      points: number
      completionTime: number
    }

export type CompleteSubQuizResult = Either<
  QuizNotFound | QuizNotAvailable | SubQuizNotFound | SubQuizNotStarted,
  CompleteSubQuizPayload
>

export type GetEnrolledSubQuizArgs = {
  userId: string
  quizId: string
  subQuizId: string
}

export type GetEnrolledSubQuizResult = Either<
  QuizNotFound | QuizNotAvailable | InvalidSubQuiz | SubQuizNotFound | SubQuizNotStarted,
  EnrolledTrueFalseQuestionDTO
>

export default interface IEnrolledTrueFalseQuestionService {
  startSubQuiz(args: StartSubQuizArgs): Promise<StartSubQuizResult>
  completeSubQuiz(args: CompleteSubQuizArgs): Promise<CompleteSubQuizResult>
  getEnrolledSubQuiz(args: GetEnrolledSubQuizArgs): Promise<GetEnrolledSubQuizResult>
}
