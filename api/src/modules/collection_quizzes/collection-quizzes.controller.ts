import {
  Body,
  Controller,
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
import ICollectionQuizService from './i-collection-quizzes.services'
import AddQuizArgs from './validators/add-quiz'

@Controller(Routes.collectionQuizzes)
@Controller(Routes.files)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.admin, Roles.user))
export default class CollectionQuizController {
  constructor(
    @Inject(Services.collectionQuiz)
    private collectionQuizService: ICollectionQuizService,
  ) {}

  @Post()
  async addQuiz(@Body() args: AddQuizArgs, @Res() res: Response) {
    const createdCollection = await this.collectionQuizService.addQuiz(args)

    if (createdCollection.isLeft()) {
      const { message, code, status } = createdCollection.error
      throw new HttpException({ message, code }, status)
    }

    return res.status(HttpStatus.CREATED).json({ createdCollection: createdCollection.value })
  }
}
