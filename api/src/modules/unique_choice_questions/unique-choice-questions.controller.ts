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
import IUniqueChoiceQuestionService from './i-unique-choice-questions.services'
import CreateSubQuizArgs from './validators/create-sub-quiz'
import GetSubQuizArgs from './validators/get-sub-quiz'

@Controller(Routes.uniqueChoiceQuestions)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.user, Roles.admin))
export default class UniqueChoiceQuestionController {
  constructor(
    @Inject(Services.uniqueChoiceQuestion)
    private uniqueChoiceQuestionService: IUniqueChoiceQuestionService,
  ) {}

  @Post()
  async createSubQuiz(@Body() args: CreateSubQuizArgs, @Res() res: Response) {
    const createdSubQuiz = await this.uniqueChoiceQuestionService.createSubQuiz(args)
    if (createdSubQuiz.isLeft()) {
      const { message, status, code } = createdSubQuiz.error
      throw new HttpException({ message, code }, status)
    }

    return res.status(HttpStatus.CREATED).json({ createdSubQuiz: createdSubQuiz.value })
  }

  @Get(':subQuizId')
  async getSubQuiz(@Body() args: GetSubQuizArgs, @Param('subQuizId') subQuizId: string) {
    const subQuiz = await this.uniqueChoiceQuestionService.getSubQuiz({
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
