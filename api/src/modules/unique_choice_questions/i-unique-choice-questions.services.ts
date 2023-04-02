import Either from 'src/utils/either'
import { NotQuizOwner, QuizAccessForbidden, QuizNotFound, SubQuizNotFound } from 'src/utils/types'
import UniqueChoiceQuestionDTO from './unique-choice-questions.dto'

export type CreateUniqueChoiceQuestionArgs = {
  userId: string
  subQuizId: string
  quizId: string
  title: string
  options: Array<string>
  idealOption: number
  coverImageURL?: string
  points: number
  timeLimit: number
}

export type CreateUniqueChoiceQuestionResult = Either<
  QuizNotFound | NotQuizOwner,
  UniqueChoiceQuestionDTO
>

export type GetSubQuizArgs = {
  subQuizId: string
  userId: string
  isAdmin: boolean
}

export type GetSubQuizResult = Either<
  QuizNotFound | SubQuizNotFound | QuizAccessForbidden,
  UniqueChoiceQuestionDTO
>

export default interface IUniqueChoiceQuestionService {
  createSubQuiz(args: CreateUniqueChoiceQuestionArgs): Promise<CreateUniqueChoiceQuestionResult>
  getSubQuiz(args: GetSubQuizArgs): Promise<GetSubQuizResult>
}
