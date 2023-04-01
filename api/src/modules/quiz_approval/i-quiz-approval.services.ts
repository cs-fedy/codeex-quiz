import Either from 'src/utils/either'
import QuizDTO from '../quizzes/quizzes.dto'

export type RequestQuizApprovalArgs = {
  title: string
  description: string
  coverImageURL: string
  creator: string
  isVisible: boolean
}

export type RequestQuizApprovalResult = Either<never, QuizDTO>

export default interface IQuizApprovalService {
  requestQuizApproval(args: RequestQuizApprovalArgs): Promise<RequestQuizApprovalResult>
}
