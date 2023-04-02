import { HttpStatus } from '@nestjs/common'
import Either from 'src/utils/either'
import { QuizNotAvailable, QuizNotFound } from 'src/utils/types'
import BookmarkDTO from './bookmarks.dto'

export type CreateBookmarkArgs = {
  quizId: string
  userId: string
}

type AlreadyBookmarked = {
  code: 'already_bookmarked'
  status: HttpStatus.BAD_REQUEST
  message: string
}

export type CreateBookmarkResult = Either<
  QuizNotFound | QuizNotAvailable | AlreadyBookmarked,
  BookmarkDTO
>

export type DeleteBookmarkArgs = {
  quizId: string
  userId: string
}

type BookmarkNotFound = {
  code: 'bookmark_not_found'
  status: HttpStatus.NOT_FOUND
  message: string
}

export type DeleteBookmarkResult = Either<BookmarkNotFound, { success: boolean }>
export type ListBookmarksResult = Either<never, Array<BookmarkDTO>>

export default interface IBookmarkService {
  createBookmark(args: CreateBookmarkArgs): Promise<CreateBookmarkResult>
  deleteBookmark(args: DeleteBookmarkArgs): Promise<DeleteBookmarkResult>
  listBookmarks(userId: string): Promise<ListBookmarksResult>
}
