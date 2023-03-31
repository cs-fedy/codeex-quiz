import { Body, Controller, HttpStatus, Inject, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import IAdminService from './i-admin.services'
import CreateQuizArgs from './validators/create-quiz'

@Controller(Routes.admin)
@Controller(Routes.files)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.admin))
export default class AdminController {
  constructor(@Inject(Services.admin) private adminService: IAdminService) {}

  @Post(Routes.quizzes)
  async createQuiz(@Body() args: CreateQuizArgs, @Res() res: Response) {
    const createdQuiz = await this.adminService.createQuiz({
      ...args,
      creator: args.userId,
    })
    if (createdQuiz.isRight()) {
      return res.status(HttpStatus.CREATED).json({ createdQuiz: createdQuiz.value })
    }
  }
}
