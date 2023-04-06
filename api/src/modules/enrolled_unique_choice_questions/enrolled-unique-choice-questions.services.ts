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
import IUniqueChoiceQuestionRepo from '../unique_choice_questions/i-unique-choice-questions.repository'
import EnrolledUniqueChoiceQuestion from './enrolled-unique-choice-questions.domain'
import EnrolledUniqueChoiceQuestionDTO from './enrolled-unique-choice-questions.dto'
import IEnrolledUniqueChoiceQuestionRepo from './i-enrolled-unique-choice-questions.repository'
import IEnrolledUniqueChoiceQuestionService, {
  CompleteSubQuizArgs,
  CompleteSubQuizResult,
  GetEnrolledSubQuizArgs,
  GetEnrolledSubQuizResult,
  StartSubQuizArgs,
  StartSubQuizResult,
} from './i-enrolled-unique-choice-questions.services'

@Injectable()
export default class EnrolledUniqueChoiceQuestionService
  implements IEnrolledUniqueChoiceQuestionService
{
  constructor(
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Repos.enrolledQuiz) private enrolledQuizRepo: IEnrolledQuizRepo,
    @Inject(Repos.uniqueChoiceQuestion)
    private uniqueChoiceQuestionRepo: IUniqueChoiceQuestionRepo,
    @Inject(Repos.enrolledUniqueChoiceQuestion)
    private enrolledUniqueChoiceQuestionRepo: IEnrolledUniqueChoiceQuestionRepo,
    @Inject(Repos.enrolledSubQuiz) private enrolledSubQuizRepo: IEnrolledSubQuizRepo,
    @Inject(Mappers.enrolledUniqueChoiceQuestion)
    private enrolledUniqueChoiceQuestionMapper: IMapper<
      EnrolledUniqueChoiceQuestion,
      EnrolledUniqueChoiceQuestionDTO
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

    const existingUniqueChoiceQuestion =
      await this.uniqueChoiceQuestionRepo.getUniqueChoiceQuestion(args.subQuizId)

    if (!existingUniqueChoiceQuestion)
      return Left.create({
        code: 'sub_quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'unique choice question sub quiz not found',
      })

    if (existingUniqueChoiceQuestion.quizId !== args.quizId)
      return Left.create({
        code: 'invalid_sub_quiz',
        status: HttpStatus.BAD_REQUEST,
        message: 'sub quiz not part of target quiz',
      })

    const existingEnrolledUniqueChoiceQuestion =
      await this.enrolledUniqueChoiceQuestionRepo.getEnrolledUniqueChoiceQuestion(
        args.userId,
        args.quizId,
        args.subQuizId,
      )

    if (existingEnrolledUniqueChoiceQuestion)
      return Left.create({
        code: 'sub_quiz_already_started',
        status: HttpStatus.BAD_REQUEST,
        message: 'sub quiz already started',
      })

    const existingEnrolledPreviousUniqueChoiceQuestion =
      await this.enrolledSubQuizRepo.getEnrolledSubQuizMetadata(
        args.userId,
        args.quizId,
        existingUniqueChoiceQuestion.prevSubQuizId ?? '',
      )

    if (
      !existingEnrolledPreviousUniqueChoiceQuestion ||
      existingEnrolledPreviousUniqueChoiceQuestion.isCompleted
    )
      return Left.create({
        code: 'previous_sub_quiz_not_completed',
        status: HttpStatus.FORBIDDEN,
        message: 'previous sub quiz is not completed',
      })

    const startedSubQuiz =
      await this.enrolledUniqueChoiceQuestionRepo.saveEnrolledUniqueChoiceQuestion({
        ...args,
        subQuizId: generateId(),
        isCompleted: false,
        enrolledSubQuizType: EnrolledSubQuizType.enrolledUniqueChoiceQuestion,
        answerCorrectness: false,
        subQuizType: SubQuizTypes.uniqueChoiceQuestion,
        points: 0,
        completionTime: 0,
        createdAt: new Date(),
        userAnswer: -1,
      })

    const mappedStartedSubQuiz = this.enrolledUniqueChoiceQuestionMapper.toDTO({
      ...startedSubQuiz,
      subQuizId: existingUniqueChoiceQuestion,
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

    const existingUniqueChoiceQuestion =
      await this.uniqueChoiceQuestionRepo.getUniqueChoiceQuestion(args.subQuizId)

    if (!existingUniqueChoiceQuestion)
      return Left.create({
        code: 'sub_quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'unique choice question sub quiz not found',
      })

    const existingEnrolledUniqueChoiceQuestion =
      await this.enrolledUniqueChoiceQuestionRepo.getEnrolledUniqueChoiceQuestion(
        args.userId,
        args.quizId,
        args.subQuizId,
      )

    if (!existingEnrolledUniqueChoiceQuestion)
      return Left.create({
        code: 'sub_quiz_not_started',
        status: HttpStatus.BAD_REQUEST,
        message: 'sub quiz not started',
      })

    const completionTime =
      (moment(existingEnrolledUniqueChoiceQuestion.createdAt).valueOf() - moment().valueOf()) / 1000

    const isUserAnswerCorrect =
      args.userAnswer === existingUniqueChoiceQuestion.idealOption && completionTime > -1

    const reward = isUserAnswerCorrect ? existingUniqueChoiceQuestion.points : 0

    await this.enrolledUniqueChoiceQuestionRepo.saveEnrolledUniqueChoiceQuestion({
      ...args,
      ...existingEnrolledUniqueChoiceQuestion,
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
            expectedAnswer: existingUniqueChoiceQuestion.idealOption,
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

    const existingUniqueChoiceQuestion =
      await this.uniqueChoiceQuestionRepo.getUniqueChoiceQuestion(args.subQuizId)

    if (!existingUniqueChoiceQuestion)
      return Left.create({
        code: 'sub_quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'unique choice question sub quiz not found',
      })

    const existingEnrolledUniqueChoiceQuestion =
      await this.enrolledUniqueChoiceQuestionRepo.getEnrolledUniqueChoiceQuestion(
        args.userId,
        args.quizId,
        args.subQuizId,
      )

    if (!existingEnrolledUniqueChoiceQuestion)
      return Left.create({
        code: 'sub_quiz_not_started',
        status: HttpStatus.BAD_REQUEST,
        message: 'sub quiz not started',
      })

    const mappedEnrolledSubQuiz = this.enrolledUniqueChoiceQuestionMapper.toDTO({
      ...existingEnrolledUniqueChoiceQuestion,
      subQuizId: existingUniqueChoiceQuestion,
    })

    return Right.create(mappedEnrolledSubQuiz)
  }
}
