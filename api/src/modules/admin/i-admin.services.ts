import Either from 'src/utils/either'
import QuizDTO from '../quizzes/quizzes.dto'

export type CreateQuizArgs = {
  title: string
  description: string
  coverImageURL: string
  isVisible: boolean
  creator: string
}

export type CreateQuizResult = Either<never, QuizDTO>

export default interface IAdminService {
  createQuiz(args: CreateQuizArgs): Promise<CreateQuizResult>
}
