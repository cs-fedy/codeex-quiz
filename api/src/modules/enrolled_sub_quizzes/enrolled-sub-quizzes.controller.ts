import { Body, Controller, Get, HttpException, Inject, Param, UseGuards } from '@nestjs/common'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import IEnrolledSubQuizService from './i-enrolled-sub-quizzes.services'

@Controller(Routes.enrolledSubQuizzes)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.user))
export default class EnrolledSubQuizController {
  constructor(
    @Inject(Services.enrolledSubQuiz) private enrolledSubQuizService: IEnrolledSubQuizService,
  ) {}

  @Get('quizzes/:quizId')
  async listEnrolledSubQuizzes(@Param('quizId') quizId: string, @Body('userId') userId: string) {
    const enrolledSubQuizzes = await this.enrolledSubQuizService.listEnrolledSubQuizzes({
      userId,
      quizId,
    })

    if (enrolledSubQuizzes.isLeft()) {
      const { message, code, status } = enrolledSubQuizzes.error
      throw new HttpException({ message, code }, status)
    }

    return { enrolledSubQuizzes: enrolledSubQuizzes.value }
  }
}
