import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import IAdminService from './i-admin.services'
import ApproveQuizArgs from './validators/approve-quiz'
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

  @Patch('quizzes/approval')
  async approveQuiz(@Body() args: ApproveQuizArgs) {
    const approvedQuiz = await this.adminService.approveQuiz(args)
    if (approvedQuiz.isLeft()) {
      const { message, code, status } = approvedQuiz.error
      throw new HttpException({ message, code }, status)
    }

    return { approvedQuiz: approvedQuiz.value }
  }
}
