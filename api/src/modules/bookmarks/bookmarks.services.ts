import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import Quiz from '../quizzes/quizzes.domain'
import BookmarkMapper from './bookmarks.mapper'
import IBookmarkRepo from './i-bookmarks.repository'
import IBookmarkService, {
  CreateBookmarkArgs,
  CreateBookmarkResult,
  DeleteBookmarkArgs,
  DeleteBookmarkResult,
  ListBookmarksResult,
} from './i-bookmarks.services'

@Injectable()
export default class BookmarkService implements IBookmarkService {
  constructor(
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Repos.bookmark) private bookmarkRepo: IBookmarkRepo,
    @Inject(Mappers.bookmark) private bookmarkMapper: BookmarkMapper,
  ) {}

  async createBookmark(args: CreateBookmarkArgs): Promise<CreateBookmarkResult> {
    const existingQuiz = await this.quizRepo.getQuizById(args.quizId)
    if (!existingQuiz)
      return Left.create({
        code: 'quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'quiz not found',
      })

    const canAccessQuiz = this.canAccessQuiz(existingQuiz, args.quizId)
    if (!canAccessQuiz)
      return Left.create({
        code: 'quiz_not_available',
        status: HttpStatus.BAD_REQUEST,
        message: 'quiz not available',
      })

    const isBookmarked = await this.bookmarkRepo.exist(args)
    if (isBookmarked)
      return Left.create({
        code: 'already_bookmarked',
        status: HttpStatus.BAD_REQUEST,
        message: 'quiz already bookmarked',
      })

    const createdBookmark = await this.bookmarkRepo.saveBookmark(args)
    const mappedBookmark = this.bookmarkMapper.toDTO(createdBookmark)
    return Right.create(mappedBookmark)
  }

  async deleteBookmark(args: DeleteBookmarkArgs): Promise<DeleteBookmarkResult> {
    const isBookmarked = await this.bookmarkRepo.exist(args)
    if (!isBookmarked)
      return Left.create({
        code: 'bookmark_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'bookmark not found',
      })

    await this.bookmarkRepo.deleteBookmark(args)
    return Right.create({ success: true })
  }

  async listBookmarks(userId: string): Promise<ListBookmarksResult> {
    const bookmarks = await this.bookmarkRepo.listUserBookmarks(userId)
    const mappedBookmarks = bookmarks.map(this.bookmarkMapper.toDTO)
    return Right.create(mappedBookmarks)
  }

  private canAccessQuiz(quiz: Quiz, userId: string): boolean {
    return quiz.creator === userId || (quiz.isApproved && quiz.isVisible)
  }
}
