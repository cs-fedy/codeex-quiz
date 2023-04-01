import { Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Events, Mappers, Repos } from 'src/utils/constants'
import { Right } from 'src/utils/either'
import generateId from 'src/utils/generate-id'
import INewQuizNotificationEvents from '../notifications/i-new-quiz-notification.events'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import Quiz from '../quizzes/quizzes.domain'
import QuizDTO from '../quizzes/quizzes.dto'
import IQuizApprovalService, {
  RequestQuizApprovalArgs,
  RequestQuizApprovalResult,
} from './i-quiz-approval.services'

@Injectable()
export default class QuizApprovalService implements IQuizApprovalService {
  constructor(
    @Inject(Mappers.quiz) private quizMapper: IMapper<Quiz, QuizDTO>,
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Events.newQuizNotification)
    private newQuizNotificationEvents: INewQuizNotificationEvents,
  ) {}

  async requestQuizApproval(args: RequestQuizApprovalArgs): Promise<RequestQuizApprovalResult> {
    const newQuiz = { ...args, quizId: generateId(), isApproved: false, subQuizzesCount: 0 }
    const createdQuiz = await this.quizRepo.saveQuiz(newQuiz)

    await this.newQuizNotificationEvents.newQuizNotification({
      userId: args.creator,
      quizId: createdQuiz.quizId,
    })

    const mappedQuiz = this.quizMapper.toDTO(createdQuiz)
    return Right.create(mappedQuiz)
  }
}
