import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import IEnrolledMultipleChoiceQuestionService from './i-enrolled-multiple-choice-questions.services'
import StartSubQuizArgs from './validators/start-sub-quiz'

@Controller(Routes.enrolledMultipleChoiceQuestions)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.user))
export default class EnrolledMultipleChoiceQuestionController {
  constructor(
    @Inject(Services.enrolledMultipleChoiceQuestion)
    private enrolledMultipleChoiceQuestionService: IEnrolledMultipleChoiceQuestionService,
  ) {}

  @Post()
  async startSubQuiz(@Body() args: StartSubQuizArgs, @Res() res: Response) {
    const startedSubQuiz = await this.enrolledMultipleChoiceQuestionService.startSubQuiz(args)
    if (startedSubQuiz.isLeft()) {
      const { message, code, status } = startedSubQuiz.error
      throw new HttpException({ message, code }, status)
    }

    return res.status(HttpStatus.CREATED).json({ startedSubQuiz: startedSubQuiz.value })
  }
}
