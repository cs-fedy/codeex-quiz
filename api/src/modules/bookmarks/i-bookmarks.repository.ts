import Bookmark from './bookmarks.domain'

export default interface IBookmarkRepo {
  saveBookmark(args: Bookmark): Promise<Bookmark>
  listUserBookmarks(userId: string): Promise<Array<Bookmark>>
  exist(args: Bookmark): Promise<boolean>
  deleteBookmark(args: Bookmark): Promise<void>
}
