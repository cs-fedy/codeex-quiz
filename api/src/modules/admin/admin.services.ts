import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Events, Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import generateId from 'src/utils/generate-id'
import INewQuizNotificationEvents from '../notifications/i-new-quiz-notification.events'
import INewQuizNotificationRepo from '../notifications/repositories/i-new-quiz-notification'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import Quiz from '../quizzes/quizzes.domain'
import QuizDTO from '../quizzes/quizzes.dto'
import IAdminService, {
  ApproveQuizArgs,
  ApproveQuizResult,
  CreateQuizArgs,
  CreateQuizResult,
} from './i-admin.services'

@Injectable()
export default class AdminService implements IAdminService {
  constructor(
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Mappers.quiz) private quizMapper: IMapper<Quiz, QuizDTO>,
    @Inject(Repos.newQuizNotification) private newQuizNotificationRepo: INewQuizNotificationRepo,
    @Inject(Events.newQuizNotification)
    private newQuizNotificationEvents: INewQuizNotificationEvents,
  ) {}

  async createQuiz(args: CreateQuizArgs): Promise<CreateQuizResult> {
    const createdQuiz = await this.quizRepo.saveQuiz({
      ...args,
      quizId: generateId(),
      isApproved: true,
      subQuizzesCount: 0,
      dificulity: 0,
    })

    const mappedQuiz = this.quizMapper.toDTO(createdQuiz)
    return Right.create(mappedQuiz)
  }

  async approveQuiz(args: ApproveQuizArgs): Promise<ApproveQuizResult> {
    const existingNotification = await this.newQuizNotificationRepo.getNewQuizNotificationById(
      args.notificationId,
    )

    if (!existingNotification)
      return Left.create({
        code: 'notification_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'notification not found',
      })

    const existingQuiz = await this.quizRepo.getQuizById(existingNotification.quizId)
    if (!existingQuiz)
      return Left.create({
        code: 'quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'quiz not found',
      })

    if (existingQuiz.isApproved)
      return Left.create({
        code: 'invalid_operation',
        status: HttpStatus.BAD_REQUEST,
        message: 'quiz already approved',
      })

    const updatedQuiz = await this.quizRepo.saveQuiz({
      ...existingQuiz,
      isApproved: args.approveOrNot,
    })

    await this.newQuizNotificationEvents.quizApprovedNotification(args)

    const mappedQuiz = this.quizMapper.toDTO(updatedQuiz)
    return Right.create(mappedQuiz)
  }
}
