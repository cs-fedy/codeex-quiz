import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import ISubQuizRepo from './i-sub-quizzes.repository'
import ISubQuizService, {
  ListQuizSubQuizzesArgs,
  ListQuizSubQuizzesResult,
} from './i-sub-quizzes.services'
import SubQuiz from './sub-quizzes.domain'
import SubQuizDTO from './sub-quizzes.dto'

@Injectable()
export default class SubQuizService implements ISubQuizService {
  constructor(
    @Inject(Repos.subQuiz) private subQuizRepo: ISubQuizRepo,
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Mappers.subQuiz) private subQuizMapper: IMapper<SubQuiz, SubQuizDTO>,
  ) {}

  async listQuizSubQuizzes(args: ListQuizSubQuizzesArgs): Promise<ListQuizSubQuizzesResult> {
    const exitingQuiz = await this.quizRepo.getQuizById(args.quizId)
    if (!exitingQuiz)
      return Left.create({
        code: 'quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'quiz not found',
      })

    if (!args.isAdmin && exitingQuiz.creator !== args.userId)
      return Left.create({
        code: 'quiz_access_forbidden',
        status: HttpStatus.FORBIDDEN,
        message: 'forbidden to access quiz',
      })

    const subQuizzes = await this.subQuizRepo.listQuizSubQuizzes(args.quizId)
    const mappedSubQuizzes = subQuizzes.map(this.subQuizMapper.toDTO)
    return Right.create(mappedSubQuizzes)
  }
}
