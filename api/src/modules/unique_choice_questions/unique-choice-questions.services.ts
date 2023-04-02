import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import generateId from 'src/utils/generate-id'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'
import IUniqueChoiceQuestionRepo from './i-unique-choice-questions.repository'
import IUniqueChoiceQuestionService, {
  CreateUniqueChoiceQuestionArgs,
  CreateUniqueChoiceQuestionResult,
  GetSubQuizArgs,
  GetSubQuizResult,
} from './i-unique-choice-questions.services'
import UniqueChoiceQuestion from './unique-choice-question.domain'
import UniqueChoiceQuestionDTO from './unique-choice-questions.dto'

@Injectable()
export default class UniqueChoiceQuestionService implements IUniqueChoiceQuestionService {
  constructor(
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Repos.uniqueChoiceQuestion)
    private uniqueChoiceQuestionRepo: IUniqueChoiceQuestionRepo,
    @Inject(Mappers.uniqueChoiceQuestion)
    private uniqueChoiceQuestionMapper: IMapper<UniqueChoiceQuestion, UniqueChoiceQuestionDTO>,
  ) {}

  async createSubQuiz(
    args: CreateUniqueChoiceQuestionArgs,
  ): Promise<CreateUniqueChoiceQuestionResult> {
    const exitingQuiz = await this.quizRepo.getQuizById(args.quizId)
    if (!exitingQuiz)
      return Left.create({
        code: 'quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'quiz not found',
      })

    if (exitingQuiz.creator !== args.userId)
      return Left.create({
        code: 'not_quiz_owner',
        status: HttpStatus.FORBIDDEN,
        message: 'not quiz owner',
      })

    const createdSubQuiz = await this.uniqueChoiceQuestionRepo.saveUniqueChoiceQuestion({
      ...args,
      subQuizId: generateId(),
      type: SubQuizTypes.uniqueChoiceQuestion,
    })

    const mappedSubQuiz = this.uniqueChoiceQuestionMapper.toDTO(createdSubQuiz)
    return Right.create(mappedSubQuiz)
  }

  async getSubQuiz(args: GetSubQuizArgs): Promise<GetSubQuizResult> {
    const existingSubQuiz = await this.uniqueChoiceQuestionRepo.getUniqueChoiceQuestion(
      args.subQuizId,
    )

    if (!existingSubQuiz)
      return Left.create({
        code: 'sub_quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'unique choice question not found',
      })

    const exitingQuiz = await this.quizRepo.getQuizById(existingSubQuiz.quizId)
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

    const mappedSubQuiz = this.uniqueChoiceQuestionMapper.toDTO(existingSubQuiz)
    return Right.create(mappedSubQuiz)
  }
}
