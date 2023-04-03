import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import EnrolledQuiz from './enrolled-quizzes.domain'
import EnrolledQuizDTO from './enrolled-quizzes.dto'
import IEnrolledQuizRepo from './i-enrolled-quizzes.repository'
import IEnrolledQuizService, {
  EnrollQuizArgs,
  EnrolledQuizResult,
  GetEnrolledQuizArgs,
  GetEnrolledQuizResult,
  ListEnrolledQuizzesResult,
} from './i-enrolled-quizzes.services'

@Injectable()
export default class EnrolledQuizService implements IEnrolledQuizService {
  constructor(
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Repos.enrolledQuiz) private enrolledQuizRepo: IEnrolledQuizRepo,
    @Inject(Mappers.enrolledQuiz)
    private enrolledQuizMapper: IMapper<EnrolledQuiz, EnrolledQuizDTO>,
  ) {}

  async enrollQuiz(args: EnrollQuizArgs): Promise<EnrolledQuizResult> {
    const existingQuiz = await this.quizRepo.getQuizById(args.quizId)
    if (!existingQuiz)
      return Left.create({
        code: 'quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'quiz not found',
      })

    if (!existingQuiz.isApproved || !existingQuiz.isVisible)
      return Left.create({
        code: 'quiz_not_available',
        status: HttpStatus.BAD_REQUEST,
        message: 'quiz not available',
      })

    const isEnrolled = await this.enrolledQuizRepo.isEnrolled(args.userId, args.quizId)
    if (!isEnrolled)
      return Left.create({
        code: 'quiz_already_started',
        status: HttpStatus.BAD_REQUEST,
        message: 'quiz already started',
      })

    const enrolledQuiz = await this.enrolledQuizRepo.saveEnrolledQuiz({
      ...args,
      points: 0,
      completedSubQuizzesCount: 0,
    })

    const mappedEnrolledQuiz = this.enrolledQuizMapper.toDTO(enrolledQuiz)
    return Right.create(mappedEnrolledQuiz)
  }

  async listEnrolledQuizzes(userId: string): Promise<ListEnrolledQuizzesResult> {
    const quizzes = await this.enrolledQuizRepo.listEnrolledQuizzes(userId)
    const mappedQuizzes = quizzes.map(this.enrolledQuizMapper.toDTO)
    return Right.create(mappedQuizzes)
  }

  async getEnrolledQuiz(args: GetEnrolledQuizArgs): Promise<GetEnrolledQuizResult> {
    const enrolledQuiz = await this.enrolledQuizRepo.getEnrolledQuiz(args.userId, args.quizId)
    if (!enrolledQuiz)
      return Left.create({
        code: 'quiz_not_enrolled',
        status: HttpStatus.BAD_REQUEST,
        message: 'quiz not enrolled',
      })

    const mappedEnrolledQuiz = this.enrolledQuizMapper.toDTO(enrolledQuiz)
    return Right.create(mappedEnrolledQuiz)
  }
}
