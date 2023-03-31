import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IQuizRepo from './i-quizzes.repository'
import IQuizService, {
  GetQuizArgs,
  GetQuizResult,
  ListCreatorQuizzesArgs,
  ListCreatorQuizzesResult,
} from './i-quizzes.services'
import Quiz from './quizzes.domain'
import QuizDTO from './quizzes.dto'

@Injectable()
export default class QuizService implements IQuizService {
  constructor(
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Mappers.quiz) private quizMapper: IMapper<Quiz, QuizDTO>,
  ) {}

  async getQuiz(args: GetQuizArgs): Promise<GetQuizResult> {
    const existingQuiz = await this.quizRepo.getQuizById(args.quizId)
    if (!existingQuiz)
      return Left.create({
        code: 'quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'quiz not found',
      })

    const canAccessQuiz = args.quizId === existingQuiz.creator || existingQuiz.isVisible
    if (!canAccessQuiz)
      return Left.create({
        code: 'quiz_not_available',
        status: HttpStatus.BAD_REQUEST,
        message: 'quiz not available',
      })

    const mappedQuiz = this.quizMapper.toDTO(existingQuiz)
    return Right.create(mappedQuiz)
  }

  async listCreatorQuizzes(args: ListCreatorQuizzesArgs): Promise<ListCreatorQuizzesResult> {
    const quizzes = await this.quizRepo.listQuizzesByCreatorId(args.creator)
    const filteredMappedQuizzes = quizzes
      .filter((quiz) => quiz.creator === args.userId || quiz.isVisible)
      .map(this.quizMapper.toDTO)

    return Right.create(filteredMappedQuizzes)
  }
}
