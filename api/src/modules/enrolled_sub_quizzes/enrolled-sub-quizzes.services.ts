import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IEnrolledQuizRepo from '../enrolled_quizzes/i-enrolled-quizzes.repository'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import EnrolledSubQuiz from './enrolled-sub-quizzes.domain'
import EnrolledSubQuizDTO from './enrolled-sub-quizzes.dto'
import IEnrolledSubQuizRepo from './i-enrolled-quizzes.repository'
import IEnrolledSubQuizService, {
  ListEnrolledSubQuizzesArgs,
  ListEnrolledSubQuizzesResult,
} from './i-enrolled-sub-quizzes.services'

@Injectable()
export default class EnrolledSubQuizService implements IEnrolledSubQuizService {
  constructor(
    @Inject(Repos.enrolledSubQuiz) private enrolledSubQuizRepo: IEnrolledSubQuizRepo,
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Repos.enrolledQuiz) private enrolledQuizRepo: IEnrolledQuizRepo,
    @Inject(Mappers.enrolledSubQuiz)
    private enrolledSubQuizMapper: IMapper<EnrolledSubQuiz, EnrolledSubQuizDTO>,
  ) {}

  async listEnrolledSubQuizzes(
    args: ListEnrolledSubQuizzesArgs,
  ): Promise<ListEnrolledSubQuizzesResult> {
    const existingQuiz = await this.quizRepo.getQuizById(args.quizId)
    if (!existingQuiz)
      return Left.create({
        code: 'quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'quiz not found',
      })

    const isEnrolled = await this.enrolledQuizRepo.isEnrolled(args.userId, args.quizId)
    if (!isEnrolled)
      return Left.create({
        code: 'quiz_not_enrolled',
        status: HttpStatus.BAD_REQUEST,
        message: 'quiz not enrolled',
      })

    const enrolledSubQuizzes = await this.enrolledSubQuizRepo.listEnrolledSubQuizzes(
      args.userId,
      args.quizId,
    )

    const mappedEnrolledSubQuizzes = enrolledSubQuizzes.map(this.enrolledSubQuizMapper.toDTO)
    return Right.create(mappedEnrolledSubQuizzes)
  }
}
