import { Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Right } from 'src/utils/either'
import generateId from 'src/utils/generate-id'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import Quiz from '../quizzes/quizzes.domain'
import QuizDTO from '../quizzes/quizzes.dto'
import IAdminService, { CreateQuizArgs, CreateQuizResult } from './i-admin.services'

@Injectable()
export default class AdminService implements IAdminService {
  constructor(
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Mappers.quiz) private quizMapper: IMapper<Quiz, QuizDTO>,
  ) {}

  async createQuiz(args: CreateQuizArgs): Promise<CreateQuizResult> {
    const newQuiz = { ...args, quizId: generateId() }
    const createdQuiz = await this.quizRepo.saveQuiz(newQuiz)
    const mappedQuiz = this.quizMapper.toDTO(createdQuiz)
    return Right.create(mappedQuiz)
  }
}
