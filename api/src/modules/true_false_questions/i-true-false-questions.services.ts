import Either from 'src/utils/either'
import { NotQuizOwner, QuizAccessForbidden, QuizNotFound, SubQuizNotFound } from 'src/utils/types'
import TrueFalseQuestionDTO from './true-false-questions.dto'

export type CreateTrueFalseQuestionArgs = {
  userId: string
  subQuizId: string
  quizId: string
  title: string
  idealOption: boolean
  coverImageURL?: string
  points: number
  timeLimit: number
  dificulity: number
}

export type CreateTrueFalseQuestionResult = Either<
  QuizNotFound | NotQuizOwner,
  TrueFalseQuestionDTO
>

export type GetSubQuizArgs = {
  subQuizId: string
  userId: string
  isAdmin: boolean
}

export type GetSubQuizResult = Either<
  QuizNotFound | SubQuizNotFound | QuizAccessForbidden,
  TrueFalseQuestionDTO
>

export default interface ITrueFalseQuestionService {
  createSubQuiz(args: CreateTrueFalseQuestionArgs): Promise<CreateTrueFalseQuestionResult>
  getSubQuiz(args: GetSubQuizArgs): Promise<GetSubQuizResult>
}
