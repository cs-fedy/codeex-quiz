import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import EnrolledQuiz from './enrolled-quizzes.domain'
import EnrolledQuizDTO from './enrolled-quizzes.dto'

@Injectable()
export default class EnrolledQuizMapper implements IMapper<EnrolledQuiz, EnrolledQuizDTO> {
  toDomain(raw: any): EnrolledQuiz {
    return new EnrolledQuiz(raw.userId, raw.quizId, raw.points, raw.completedSubQuizzesCount)
  }

  toPersistence(domain: EnrolledQuiz): any {
    return {
      userId: domain.userId,
      quizId: domain.quizId,
      points: domain.points,
      completedSubQuizzesCount: domain.completedSubQuizzesCount,
    }
  }

  toDTO(domain: EnrolledQuiz): EnrolledQuizDTO {
    return new EnrolledQuizDTO(
      domain.userId,
      domain.quizId,
      domain.points,
      domain.completedSubQuizzesCount,
    )
  }
}
