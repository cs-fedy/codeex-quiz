import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import generateId from 'src/utils/generate-id'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'
import IMultipleChoiceQuestionRepo from './i-multiple-choice-questions.repository'
import IMultipleChoiceQuestionService, {
  CreateMultipleChoiceQuestionArgs,
  CreateMultipleChoiceQuestionResult,
  GetSubQuizArgs,
  GetSubQuizResult,
} from './i-multiple-choice-questions.services'
import MultipleChoiceQuestion from './multiple-choice-question.domain'
import MultipleChoiceQuestionDTO from './multiple-choice-questions.dto'

@Injectable()
export default class MultipleChoiceQuestionService implements IMultipleChoiceQuestionService {
  constructor(
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Repos.multipleChoiceQuestion)
    private multipleChoiceQuestionRepo: IMultipleChoiceQuestionRepo,
    @Inject(Mappers.multipleChoiceQuestion)
    private multipleChoiceQuestionMapper: IMapper<
      MultipleChoiceQuestion,
      MultipleChoiceQuestionDTO
    >,
  ) {}

  async createSubQuiz(
    args: CreateMultipleChoiceQuestionArgs,
  ): Promise<CreateMultipleChoiceQuestionResult> {
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

    const createdSubQuiz = await this.multipleChoiceQuestionRepo.saveMultipleChoiceQuestion({
      ...args,
      subQuizId: generateId(),
      type: SubQuizTypes.multipleChoiceQuestion,
    })

    const mappedSubQuiz = this.multipleChoiceQuestionMapper.toDTO(createdSubQuiz)
    return Right.create(mappedSubQuiz)
  }

  async getSubQuiz(args: GetSubQuizArgs): Promise<GetSubQuizResult> {
    const existingSubQuiz = await this.multipleChoiceQuestionRepo.getMultipleChoiceQuestion(
      args.subQuizId,
    )

    if (!existingSubQuiz)
      return Left.create({
        code: 'sub_quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'multiple choice question not found',
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
        code: 'not_quiz_owner',
        status: HttpStatus.FORBIDDEN,
        message: 'not quiz owner',
      })

    const mappedSubQuiz = this.multipleChoiceQuestionMapper.toDTO(existingSubQuiz)
    return Right.create(mappedSubQuiz)
  }
}
