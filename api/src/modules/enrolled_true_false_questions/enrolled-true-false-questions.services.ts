import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import * as moment from 'moment'
import IMapper from 'src/common/mapper'
import { Events, Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import generateId from 'src/utils/generate-id'
import IEnrolledQuizRepo from '../enrolled_quizzes/i-enrolled-quizzes.repository'
import { EnrolledSubQuizType } from '../enrolled_sub_quizzes/enrolled-sub-quizzes.domain'
import IEnrolledSubQuizRepo from '../enrolled_sub_quizzes/i-enrolled-quizzes.repository'
import IEnrolledSubQuizEvents from '../enrolled_sub_quizzes/i-enrolled-sub-quizzes.events'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'
import ITrueFalseQuestionRepo from '../true_false_questions/i-true-false-questions.repository'
import EnrolledTrueFalseQuestion from './enrolled-true-false-questions.domain'
import EnrolledTrueFalseQuestionDTO from './enrolled-true-false-questions.dto'
import IEnrolledTrueFalseQuestionRepo from './i-enrolled-true-false-questions.repository'
import IEnrolledTrueFalseQuestionService, {
  CompleteSubQuizArgs,
  CompleteSubQuizResult,
  GetEnrolledSubQuizArgs,
  GetEnrolledSubQuizResult,
  StartSubQuizArgs,
  StartSubQuizResult,
} from './i-enrolled-true-false-questions.services'

@Injectable()
export default class EnrolledTrueFalseQuestionService implements IEnrolledTrueFalseQuestionService {
  constructor(
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Repos.enrolledQuiz) private enrolledQuizRepo: IEnrolledQuizRepo,
    @Inject(Repos.trueFalseQuestion)
    private trueFalseQuestionRepo: ITrueFalseQuestionRepo,
    @Inject(Repos.enrolledTrueFalseQuestion)
    private enrolledTrueFalseQuestionRepo: IEnrolledTrueFalseQuestionRepo,
    @Inject(Repos.enrolledSubQuiz) private enrolledSubQuizRepo: IEnrolledSubQuizRepo,
    @Inject(Mappers.enrolledTrueFalseQuestion)
    private enrolledTrueFalseQuestionMapper: IMapper<
      EnrolledTrueFalseQuestion,
      EnrolledTrueFalseQuestionDTO
    >,
    @Inject(Events.enrolledSubQuiz) private enrolledSubQuizEvents: IEnrolledSubQuizEvents,
  ) {}

  async startSubQuiz(args: StartSubQuizArgs): Promise<StartSubQuizResult> {
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
        code: 'quiz_not_enrolled',
        status: HttpStatus.BAD_REQUEST,
        message: 'quiz not started',
      })

    const existingTrueFalseQuestion = await this.trueFalseQuestionRepo.getTrueFalseQuestion(
      args.subQuizId,
    )

    if (!existingTrueFalseQuestion)
      return Left.create({
        code: 'sub_quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'true or false question sub quiz not found',
      })

    if (existingTrueFalseQuestion.quizId !== args.quizId)
      return Left.create({
        code: 'invalid_sub_quiz',
        status: HttpStatus.BAD_REQUEST,
        message: 'sub quiz not part of target quiz',
      })

    const existingEnrolledTrueFalseQuestion =
      await this.enrolledTrueFalseQuestionRepo.getEnrolledTrueFalseQuestion(
        args.userId,
        args.quizId,
        args.subQuizId,
      )

    if (existingEnrolledTrueFalseQuestion)
      return Left.create({
        code: 'sub_quiz_already_started',
        status: HttpStatus.BAD_REQUEST,
        message: 'sub quiz already started',
      })

    const existingEnrolledPreviousTrueFalseQuestion =
      await this.enrolledSubQuizRepo.getEnrolledSubQuizMetadata(
        args.userId,
        args.quizId,
        existingTrueFalseQuestion.prevSubQuizId ?? '',
      )

    if (
      !existingEnrolledPreviousTrueFalseQuestion ||
      existingEnrolledPreviousTrueFalseQuestion.isCompleted
    )
      return Left.create({
        code: 'previous_sub_quiz_not_completed',
        status: HttpStatus.FORBIDDEN,
        message: 'previous sub quiz is not completed',
      })

    const startedSubQuiz = await this.enrolledTrueFalseQuestionRepo.saveEnrolledTrueFalseQuestion({
      ...args,
      subQuizId: generateId(),
      isCompleted: false,
      enrolledSubQuizType: EnrolledSubQuizType.enrolledTrueFalseQuestion,
      answerCorrectness: false,
      subQuizType: SubQuizTypes.trueFalseQuestion,
      points: 0,
      completionTime: 0,
      createdAt: new Date(),
      userAnswer: false,
    })

    const mappedStartedSubQuiz = this.enrolledTrueFalseQuestionMapper.toDTO({
      ...startedSubQuiz,
      subQuizId: existingTrueFalseQuestion,
    })

    return Right.create(mappedStartedSubQuiz)
  }

  async completeSubQuiz(args: CompleteSubQuizArgs): Promise<CompleteSubQuizResult> {
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

    const existingTrueFalseQuestion = await this.trueFalseQuestionRepo.getTrueFalseQuestion(
      args.subQuizId,
    )

    if (!existingTrueFalseQuestion)
      return Left.create({
        code: 'sub_quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'true choice question sub quiz not found',
      })

    const existingEnrolledTrueFalseQuestion =
      await this.enrolledTrueFalseQuestionRepo.getEnrolledTrueFalseQuestion(
        args.userId,
        args.quizId,
        args.subQuizId,
      )

    if (!existingEnrolledTrueFalseQuestion)
      return Left.create({
        code: 'sub_quiz_not_started',
        status: HttpStatus.BAD_REQUEST,
        message: 'sub quiz not started',
      })

    const completionTime =
      (moment(existingEnrolledTrueFalseQuestion.createdAt).valueOf() - moment().valueOf()) / 1000

    const isUserAnswerCorrect =
      args.userAnswer === existingTrueFalseQuestion.idealOption && completionTime > -1

    const reward = isUserAnswerCorrect ? existingTrueFalseQuestion.points : 0

    await this.enrolledTrueFalseQuestionRepo.saveEnrolledTrueFalseQuestion({
      ...args,
      ...existingEnrolledTrueFalseQuestion,
      points: reward,
      isCompleted: true,
      answerCorrectness: isUserAnswerCorrect,
      completionTime,
    })

    await this.enrolledSubQuizEvents.newEnrolledSubQuiz(args)

    return Right.create(
      isUserAnswerCorrect
        ? { answerCorrectness: true }
        : {
            answerCorrectness: false,
            userAnswer: args.userAnswer,
            expectedAnswer: existingTrueFalseQuestion.idealOption,
            points: reward,
            completionTime,
          },
    )
  }

  async getEnrolledSubQuiz(args: GetEnrolledSubQuizArgs): Promise<GetEnrolledSubQuizResult> {
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

    const existingTrueFalseQuestion = await this.trueFalseQuestionRepo.getTrueFalseQuestion(
      args.subQuizId,
    )

    if (!existingTrueFalseQuestion)
      return Left.create({
        code: 'sub_quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'true choice question sub quiz not found',
      })

    const existingEnrolledTrueFalseQuestion =
      await this.enrolledTrueFalseQuestionRepo.getEnrolledTrueFalseQuestion(
        args.userId,
        args.quizId,
        args.subQuizId,
      )

    if (!existingEnrolledTrueFalseQuestion)
      return Left.create({
        code: 'sub_quiz_not_started',
        status: HttpStatus.BAD_REQUEST,
        message: 'sub quiz not started',
      })

    const mappedEnrolledSubQuiz = this.enrolledTrueFalseQuestionMapper.toDTO({
      ...existingEnrolledTrueFalseQuestion,
      subQuizId: existingTrueFalseQuestion,
    })

    return Right.create(mappedEnrolledSubQuiz)
  }
}
