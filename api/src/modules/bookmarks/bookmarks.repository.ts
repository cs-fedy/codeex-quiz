import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import Bookmark from './bookmarks.domain'
import BookmarkDTO from './bookmarks.dto'
import { BookmarkDocument } from './bookmarks.model'
import IBookmarkRepo from './i-bookmarks.repository'

@Injectable()
export default class BookmarkRepo implements IBookmarkRepo {
  constructor(
    @InjectModel(Models.bookmarks) private bookmarkModel: Model<BookmarkDocument>,
    @Inject(Mappers.bookmark) private bookmarkMapper: IMapper<Bookmark, BookmarkDTO>,
  ) {}

  async saveBookmark(args: Bookmark): Promise<Bookmark> {
    const newBookmark = this.bookmarkMapper.toPersistence(args)
    const savedBookmark = await this.bookmarkModel.findOneAndUpdate(
      { quizId: args.quizId, userId: args.userId },
      newBookmark,
      { upsert: true, new: true },
    )

    return this.bookmarkMapper.toDomain(savedBookmark)
  }

  async listUserBookmarks(userId: string): Promise<Array<Bookmark>> {
    const bookmarks = await this.bookmarkModel.find({ userId })
    const mappedBookmarks = bookmarks.map(this.bookmarkMapper.toDomain)
    return mappedBookmarks
  }

  async exist(args: Bookmark): Promise<boolean> {
    const bookmark = await this.bookmarkModel.findOne({
      quizId: args.quizId,
      userId: args.userId,
    })

    return !!bookmark
  }

  async deleteBookmark(args: Bookmark): Promise<void> {
    await this.bookmarkModel.findOneAndDelete({
      quizId: args.quizId,
      userId: args.userId,
    })
  }
}
