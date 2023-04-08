import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import TopicQuiz from './topic-quizzes.domain'
import TopicQuizDTO from './topic-quizzes.dto'

@Injectable()
export default class TopicQuizMapper implements IMapper<TopicQuiz, TopicQuizDTO> {
  toDomain(raw: any): TopicQuiz {
    return new TopicQuiz(raw.topicId, raw.quizId)
  }

  toPersistence(domain: TopicQuiz) {
    return {
      topicId: domain.topicId,
      quizId: domain.quizId,
    }
  }

  toDTO(domain: TopicQuiz): TopicQuizDTO {
    return new TopicQuizDTO(domain.topicId, domain.quizId)
  }
}
