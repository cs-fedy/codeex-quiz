import { Body, Controller, Get, HttpException, Inject, Param, UseGuards } from '@nestjs/common'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import ISubQuizService from './i-sub-quizzes.services'
import ListQuizSubQuizzesArgs from './validators/list-sub-quizzes'

@Controller(Routes.subQuizzes)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.admin, Roles.user))
export default class SubQuizController {
  constructor(@Inject(Services.subQuiz) private subQuizService: ISubQuizService) {}

  @Get('quizzes/:quizId')
  async listQuizSubQuizzes(@Body() args: ListQuizSubQuizzesArgs, @Param('quizId') quizId: string) {
    const subQuizzes = await this.subQuizService.listQuizSubQuizzes({
      ...args,
      isAdmin: args.roles.includes(Roles.admin),
      quizId,
    })
    if (subQuizzes.isLeft()) {
      const { message, status, code } = subQuizzes.error
      throw new HttpException({ message, code }, status)
    }

    return { subQuizzes: subQuizzes.value }
  }
}
