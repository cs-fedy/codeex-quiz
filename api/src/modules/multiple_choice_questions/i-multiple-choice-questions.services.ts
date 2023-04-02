import Either from 'src/utils/either'
import { NotQuizOwner, QuizAccessForbidden, QuizNotFound, SubQuizNotFound } from 'src/utils/types'
import MultipleChoiceQuestionDTO from './multiple-choice-questions.dto'

export type CreateMultipleChoiceQuestionArgs = {
  userId: string
  subQuizId: string
  quizId: string
  title: string
  options: Array<string>
  idealOptions: Array<number>
  coverImageURL?: string
  points: number
  timeLimit: number
  dificulity: number
}

export type CreateMultipleChoiceQuestionResult = Either<
  QuizNotFound | NotQuizOwner,
  MultipleChoiceQuestionDTO
>

export type GetSubQuizArgs = {
  subQuizId: string
  userId: string
  isAdmin: boolean
}

export type GetSubQuizResult = Either<
  QuizNotFound | SubQuizNotFound | QuizAccessForbidden,
  MultipleChoiceQuestionDTO
>

export default interface IMultipleChoiceQuestionService {
  createSubQuiz(args: CreateMultipleChoiceQuestionArgs): Promise<CreateMultipleChoiceQuestionResult>
  getSubQuiz(args: GetSubQuizArgs): Promise<GetSubQuizResult>
}
