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
import ITopicService from './i-topics.services'
import CreateTopicArgs from './validators/create-topic'

@Controller(Routes.topics)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.admin, Roles.user))
export default class TopicController {
  constructor(@Inject(Services.topic) private topicService: ITopicService) {}

  @Post()
  async createTopic(@Body() args: CreateTopicArgs, @Res() res: Response) {
    const createdTopic = await this.topicService.createTopic(args)
    if (createdTopic.isRight()) {
      return res.status(HttpStatus.CREATED).json({ createdTopic: createdTopic.value })
    }
  }

  @Get(':topicId')
  async getTopic(@Param('topicId') topicId: string) {
    const topic = await this.topicService.getTopic(topicId)
    if (topic.isLeft()) {
      const { message, code, status } = topic.error
      throw new HttpException({ message, code }, status)
    }

    return { topic: topic.value }
  }

  @Get()
  async listTopics() {
    const topics = await this.topicService.listTopics()
    if (topics.isRight()) {
      return { topics: topics.value }
    }
  }
}
