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
import EnrolledUniqueChoiceQuestionDTO from './enrolled-unique-choice-questions.dto'

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
  EnrolledUniqueChoiceQuestionDTO
>

export type CompleteSubQuizArgs = {
  userId: string
  quizId: string
  subQuizId: string
  userAnswer: number
}

type CompleteSubQuizPayload =
  | { answerCorrectness: true }
  | {
      answerCorrectness: false
      userAnswer: number
      expectedAnswer: number
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
  EnrolledUniqueChoiceQuestionDTO
>

export default interface IEnrolledUniqueChoiceQuestionService {
  startSubQuiz(args: StartSubQuizArgs): Promise<StartSubQuizResult>
  completeSubQuiz(args: CompleteSubQuizArgs): Promise<CompleteSubQuizResult>
  getEnrolledSubQuiz(args: GetEnrolledSubQuizArgs): Promise<GetEnrolledSubQuizResult>
}
