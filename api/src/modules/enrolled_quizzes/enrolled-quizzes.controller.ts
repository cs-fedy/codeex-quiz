import {
  Body,
  Controller,
  Get,
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
import IEnrolledQuizService from './i-enrolled-quizzes.services'
import EnrollQuizArgs from './validators/enroll-quiz'

@Controller(Routes.enrolledQuizzes)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.user))
export default class EnrolledQuizController {
  constructor(@Inject(Services.enrolledQuiz) private enrolledQuizService: IEnrolledQuizService) {}

  @Post()
  async enrollQuiz(@Body() args: EnrollQuizArgs, @Res() res: Response) {
    const enrolledQuiz = await this.enrolledQuizService.enrollQuiz(args)
    if (enrolledQuiz.isLeft()) {
      const { code, message, status } = enrolledQuiz.error
      throw new HttpException({ code, message }, status)
    }

    return res.status(HttpStatus.CREATED).json({ enrolledQuiz: enrolledQuiz.value })
  }

  @Get()
  async listEnrolledQuizzes(@Body('userId') userId: string) {
    const enrolledQuizzes = await this.enrolledQuizService.listEnrolledQuizzes(userId)
    if (enrolledQuizzes.isRight()) {
      return { enrolledQuizzes: enrolledQuizzes.value }
    }
  }
}
