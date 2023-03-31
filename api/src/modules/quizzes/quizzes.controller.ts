import { Body, Controller, Get, HttpException, Inject, Param, UseGuards } from '@nestjs/common'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import IQuizService from './i-quizzes.services'

@Controller(Routes.quizzes)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.admin, Roles.user))
export default class QuizController {
  constructor(@Inject(Services.quiz) private quizService: IQuizService) {}

  @Get(':quizId')
  async getQuiz(@Body('userId') userId: string, @Param('quizId') quizId: string) {
    const fetchedQuiz = await this.quizService.getQuiz({ userId, quizId })
    if (fetchedQuiz.isLeft()) {
      const { message, code, status } = fetchedQuiz.error
      throw new HttpException({ message, code }, status)
    }

    return { quiz: fetchedQuiz.value }
  }

  @Get(Routes.logged)
  async ListLoggedUserQuizzes(@Body('userId') userId: string) {
    const quizzes = await this.quizService.listCreatorQuizzes({ userId, creator: userId })
    if (quizzes.isRight()) {
      return { quizzes: quizzes.value }
    }
  }

  @Get('creator/:creatorId')
  async ListCreatorQuizzes(@Body('userId') userId: string, @Param('creatorId') creatorId: string) {
    const quizzes = await this.quizService.listCreatorQuizzes({ userId, creator: creatorId })
    if (quizzes.isRight()) {
      return { quizzes: quizzes.value }
    }
  }
}
