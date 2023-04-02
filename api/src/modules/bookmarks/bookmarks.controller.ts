import {
  Body,
  Controller,
  Delete,
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
import IBookmarkService from './i-bookmarks.services'
import CreateBookmarkArgs from './validators/create-bookmark'

@Controller(Routes.bookmarks)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.user))
export default class BookmarkController {
  constructor(@Inject(Services.bookmark) private bookmarkService: IBookmarkService) {}

  @Post()
  async createBookmark(@Body() args: CreateBookmarkArgs, @Res() res: Response) {
    const createdBookmark = await this.bookmarkService.createBookmark(args)
    if (createdBookmark.isLeft()) {
      const { message, status, code } = createdBookmark.error
      throw new HttpException({ message, code }, status)
    }

    return res.status(HttpStatus.CREATED).json({ createdBookmark: createdBookmark.value })
  }

  @Delete()
  async deleteBookmark(
    @Body('userId') userId: string,
    @Param('quizId') quizId: string,
    @Res() res: Response,
  ) {
    const deletedBookmark = await this.bookmarkService.deleteBookmark({ userId, quizId })
    if (deletedBookmark.isLeft()) {
      const { message, status, code } = deletedBookmark.error
      throw new HttpException({ message, code }, status)
    }

    return res.status(HttpStatus.NO_CONTENT).json(deletedBookmark.value)
  }

  @Get()
  async listBookmarks(@Body('userId') userId: string) {
    const bookmarks = await this.bookmarkService.listBookmarks(userId)
    if (bookmarks.isRight()) {
      return { bookmarks: bookmarks.value }
    }
  }
}
