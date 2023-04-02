import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import generateId from 'src/utils/generate-id'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'
import ITrueFalseQuestionRepo from './i-true-false-questions.repository'
import ITrueFalseQuestionService, {
  CreateTrueFalseQuestionArgs,
  CreateTrueFalseQuestionResult,
  GetSubQuizArgs,
  GetSubQuizResult,
} from './i-true-false-questions.services'
import TrueFalseQuestion from './true-false-question.domain'
import TrueFalseQuestionDTO from './true-false-questions.dto'

@Injectable()
export default class TrueFalseQuestionService implements ITrueFalseQuestionService {
  constructor(
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Repos.trueFalseQuestion)
    private trueFalseQuestionRepo: ITrueFalseQuestionRepo,
    @Inject(Mappers.trueFalseQuestion)
    private trueFalseQuestionMapper: IMapper<TrueFalseQuestion, TrueFalseQuestionDTO>,
  ) {}

  async createSubQuiz(args: CreateTrueFalseQuestionArgs): Promise<CreateTrueFalseQuestionResult> {
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

    const createdSubQuiz = await this.trueFalseQuestionRepo.saveTrueFalseQuestion({
      ...args,
      subQuizId: generateId(),
      type: SubQuizTypes.trueFalseQuestion,
    })

    const mappedSubQuiz = this.trueFalseQuestionMapper.toDTO(createdSubQuiz)
    return Right.create(mappedSubQuiz)
  }

  async getSubQuiz(args: GetSubQuizArgs): Promise<GetSubQuizResult> {
    const existingSubQuiz = await this.trueFalseQuestionRepo.getTrueFalseQuestion(args.subQuizId)

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

    const mappedSubQuiz = this.trueFalseQuestionMapper.toDTO(existingSubQuiz)
    return Right.create(mappedSubQuiz)
  }
}
