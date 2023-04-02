import { HttpStatus } from '@nestjs/common'
import Either from 'src/utils/either'
import { QuizNotFound } from 'src/utils/types'
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
}

type NotQuizOwner = {
  code: 'not_quiz_owner'
  status: HttpStatus.FORBIDDEN
  message: string
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

type SubQuizNotFound = {
  code: 'sub_quiz_not_found'
  status: HttpStatus.NOT_FOUND
  message: string
}

export type GetSubQuizResult = Either<
  QuizNotFound | SubQuizNotFound | NotQuizOwner,
  MultipleChoiceQuestionDTO
>

export default interface IMultipleChoiceQuestionService {
  createSubQuiz(args: CreateMultipleChoiceQuestionArgs): Promise<CreateMultipleChoiceQuestionResult>
  getSubQuiz(args: GetSubQuizArgs): Promise<GetSubQuizResult>
}
