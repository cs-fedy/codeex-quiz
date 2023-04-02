import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import Bookmark from './bookmarks.domain'
import BookmarkDTO from './bookmarks.dto'

@Injectable()
export default class BookmarkMapper implements IMapper<Bookmark, BookmarkDTO> {
  toDomain(raw: any): Bookmark {
    return new Bookmark(raw.quizId, raw.userId)
  }

  toPersistence(domain: Bookmark): any {
    return {
      quizId: domain.quizId,
      userId: domain.userId,
    }
  }

  toDTO(domain: Bookmark): BookmarkDTO {
    return new BookmarkDTO(domain.quizId, domain.userId)
  }
}
