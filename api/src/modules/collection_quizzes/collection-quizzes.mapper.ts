import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import Quiz from './collection-quizzes.domain'
import QuizDTO from './collection-quizzes.dto'

@Injectable()
export default class CollectionQuizMapper implements IMapper<Quiz, QuizDTO> {
  toDomain(raw: any): Quiz {
    return new Quiz(raw.collectionId, raw.quizId)
  }

  toPersistence(domain: Quiz): any {
    return {
      collectionId: domain.collectionId,
      quizId: domain.quizId,
    }
  }

  toDTO(domain: Quiz): QuizDTO {
    return new QuizDTO(domain.collectionId, domain.quizId)
  }
}
