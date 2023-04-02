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
import ITrueFalseQuestionService from './i-true-false-questions.services'
import CreateSubQuizArgs from './validators/create-sub-quiz'
import GetSubQuizArgs from './validators/get-sub-quiz'

@Controller(Routes.trueFalseQuestions)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.user, Roles.admin))
export default class TrueFalseQuestionController {
  constructor(
    @Inject(Services.trueFalseQuestion)
    private trueFalseQuestionService: ITrueFalseQuestionService,
  ) {}

  @Post()
  async createSubQuiz(@Body() args: CreateSubQuizArgs, @Res() res: Response) {
    const createdSubQuiz = await this.trueFalseQuestionService.createSubQuiz(args)
    if (createdSubQuiz.isLeft()) {
      const { message, status, code } = createdSubQuiz.error
      throw new HttpException({ message, code }, status)
    }

    return res.status(HttpStatus.CREATED).json({ createdSubQuiz: createdSubQuiz.value })
  }

  @Get(':subQuizId')
  async getSubQuiz(@Body() args: GetSubQuizArgs, @Param('subQuizId') subQuizId: string) {
    const subQuiz = await this.trueFalseQuestionService.getSubQuiz({
      userId: args.userId,
      isAdmin: args.roles.includes(Roles.admin),
      subQuizId,
    })

    if (subQuiz.isLeft()) {
      const { message, status, code } = subQuiz.error
      throw new HttpException({ message, code }, status)
    }

    return { subQuiz: subQuiz.value }
  }
}
