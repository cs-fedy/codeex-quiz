import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import Quiz from './quizzes.domain'
import QuizDTO from './quizzes.dto'

@Injectable()
export default class QuizMapper implements IMapper<Quiz, QuizDTO> {
  toDomain(raw: any): Quiz {
    return new Quiz(
      raw._id,
      raw.title,
      raw.description,
      raw.coverImageURL,
      raw.isVisible,
      raw.isApproved,
      raw.creator,
      raw.subQuizzesCount,
    )
  }

  toPersistence(domain: Quiz): any {
    return {
      _id: domain.quizId,
      title: domain.title,
      description: domain.description,
      coverImageURL: domain.coverImageURL,
      isVisible: domain.isVisible,
      isApproved: domain.isApproved,
      creator: domain.creator,
      subQuizzesCount: domain.subQuizzesCount,
    }
  }

  toDTO(domain: Quiz): QuizDTO {
    return new QuizDTO(
      domain.quizId,
      domain.title,
      domain.description,
      domain.coverImageURL,
      domain.isVisible,
      domain.isApproved,
      domain.creator,
      domain.subQuizzesCount,
    )
  }
}
