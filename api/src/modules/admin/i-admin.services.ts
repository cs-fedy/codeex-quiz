import Either from 'src/utils/either'
import { InvalidOperation, NotificationNotFound, QuizNotFound } from 'src/utils/types'
import QuizDTO from '../quizzes/quizzes.dto'

export type CreateQuizArgs = {
  title: string
  description: string
  coverImageURL: string
  isVisible: boolean
  creator: string
}

export type CreateQuizResult = Either<never, QuizDTO>

export type ApproveQuizArgs = {
  notificationId: string
  decision?: string
  approveOrNot: boolean
}

export type ApproveQuizResult = Either<
  QuizNotFound | InvalidOperation | NotificationNotFound,
  QuizDTO
>

export default interface IAdminService {
  createQuiz(args: CreateQuizArgs): Promise<CreateQuizResult>
  approveQuiz(args: ApproveQuizArgs): Promise<ApproveQuizResult>
}
