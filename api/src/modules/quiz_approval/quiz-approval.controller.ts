import { Body, Controller, HttpStatus, Inject, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import IQuizApprovalService from './i-quiz-approval.services'
import RequestQuizApprovalArgs from './validators/request-quiz-approval'

@Controller(Routes.quizzesApproval)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.user))
export default class QuizApprovalController {
  constructor(@Inject(Services.quizApproval) private quizApprovalService: IQuizApprovalService) {}

  @Post(Routes.request)
  async requestQuizApproval(@Body() args: RequestQuizApprovalArgs, @Res() res: Response) {
    const formattedArgs = { ...args, creator: args.userId }
    const createdQuiz = await this.quizApprovalService.requestQuizApproval(formattedArgs)
    if (createdQuiz.isRight()) {
      return res.status(HttpStatus.CREATED).json({ createdQuiz: createdQuiz.value })
    }
  }
}
