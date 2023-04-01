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
import IMultipleChoiceQuestionService from './i-multiple-choice-questions.services'
import CreateSubQuizArgs from './validators/create-sub-quiz'

@Controller(Routes.multipleChoiceQuestions)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.user, Roles.admin))
export default class MultipleChoiceQuestionController {
  constructor(
    @Inject(Services.multipleChoiceQuestion)
    private multipleChoiceQuestionService: IMultipleChoiceQuestionService,
  ) {}

  @Post()
  async createSubQuiz(@Body() args: CreateSubQuizArgs, @Res() res: Response) {
    const createdSubQuiz = await this.multipleChoiceQuestionService.createSubQuiz(args)
    if (createdSubQuiz.isLeft()) {
      const { message, status, code } = createdSubQuiz.error
      throw new HttpException({ message, code }, status)
    }

    return res.status(HttpStatus.CREATED).json({ createdSubQuiz: createdSubQuiz.value })
  }
}
