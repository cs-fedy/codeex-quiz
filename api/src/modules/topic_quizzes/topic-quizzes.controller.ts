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
import ITopicQuizService from './i-topic-quizzes.services'
import AddTopicQuizArgs from './validators/add-topic-quiz'

@Controller(Routes.topicQuizzes)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.admin, Roles.user))
export default class TopicQuizController {
  constructor(@Inject(Services.topicQuiz) private topicQuizService: ITopicQuizService) {}

  @Post()
  async addTopicQuiz(@Body() args: AddTopicQuizArgs, @Res() res: Response) {
    const createdTopicQuiz = await this.topicQuizService.addTopicQuiz(args)
    if (createdTopicQuiz.isLeft()) {
      const { message, code, status } = createdTopicQuiz.error
      throw new HttpException({ message, code }, status)
    }

    return res.status(HttpStatus.CREATED).json({ createdTopicQuiz: createdTopicQuiz.value })
  }

  @Get('topics/:topicId')
  async listTopicQuizzes(@Param('topicId') topicId: string) {
    const topicQuizzes = await this.topicQuizService.listTopicQuizzes(topicId)
    if (topicQuizzes.isLeft()) {
      const { message, code, status } = topicQuizzes.error
      throw new HttpException({ message, code }, status)
    }

    return { topicQuizzes: topicQuizzes.value }
  }
}
