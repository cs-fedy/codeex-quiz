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

export default interface IMultipleChoiceQuestionService {
  createSubQuiz(args: CreateMultipleChoiceQuestionArgs): Promise<CreateMultipleChoiceQuestionResult>
}
