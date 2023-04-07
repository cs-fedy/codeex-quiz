import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import IEnrolledTrueFalseQuestionService from './i-enrolled-true-false-questions.services'
import CompleteSubQuizArgs from './validators/complete-sub-quiz'
import StartSubQuizArgs from './validators/start-sub-quiz'

@Controller(Routes.enrolledTrueFalseQuestions)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.user))
export default class EnrolledTrueFalseQuestionController {
  constructor(
    @Inject(Services.enrolledTrueFalseQuestion)
    private enrolledTrueFalseQuestionService: IEnrolledTrueFalseQuestionService,
  ) {}

  @Post(Routes.start)
  async startSubQuiz(@Body() args: StartSubQuizArgs, @Res() res: Response) {
    const startedSubQuiz = await this.enrolledTrueFalseQuestionService.startSubQuiz(args)
    if (startedSubQuiz.isLeft()) {
      const { message, code, status } = startedSubQuiz.error
      throw new HttpException({ message, code }, status)
    }

    return res.status(HttpStatus.CREATED).json({ startedSubQuiz: startedSubQuiz.value })
  }

  @Post(Routes.complete)
  async completeSubQuiz(@Body() args: CompleteSubQuizArgs) {
    const completedSubQuiz = await this.enrolledTrueFalseQuestionService.completeSubQuiz(args)
    if (completedSubQuiz.isLeft()) {
      const { message, code, status } = completedSubQuiz.error
      throw new HttpException({ message, code }, status)
    }

    return { completedSubQuiz: completedSubQuiz.value }
  }

  @Get(':subQuizId/quizzes/:quizId')
  async getEnrolledSubQuiz(
    @Param('subQuizId') subQuizId: string,
    @Param('quizId') quizId: string,
    @Body('userId') userId: string,
  ) {
    const enrolledSubQuiz = await this.enrolledTrueFalseQuestionService.getEnrolledSubQuiz({
      subQuizId,
      quizId,
      userId,
    })

    if (enrolledSubQuiz.isLeft()) {
      const { message, code, status } = enrolledSubQuiz.error
      throw new HttpException({ message, code }, status)
    }

    return { enrolledSubQuiz: enrolledSubQuiz.value }
  }
}
