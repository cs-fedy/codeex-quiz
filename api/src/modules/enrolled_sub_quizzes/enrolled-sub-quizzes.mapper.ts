import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import EnrolledSubQuiz from './enrolled-sub-quizzes.domain'
import EnrolledSubQuizDTO from './enrolled-sub-quizzes.dto'

@Injectable()
export default class EnrolledSubQuizMapper implements IMapper<EnrolledSubQuiz, EnrolledSubQuizDTO> {
  toDomain(raw: any): EnrolledSubQuiz {
    return new EnrolledSubQuiz(
      raw.__type,
      raw.userId,
      raw.quizId,
      raw.subQuizType,
      raw.subQuizId,
      raw.points,
      raw.isCompleted,
      raw.answerCorrectness,
      raw.completionTime,
      raw.createdAt,
    )
  }

  toPersistence(domain: EnrolledSubQuiz): any {
    return {
      __type: domain.enrolledSubQuizType,
      userId: domain.userId,
      quizId: domain.quizId,
      subQuizType: domain.subQuizType,
      subQuizId: domain.subQuizId,
      points: domain.points,
      isCompleted: domain.isCompleted,
      answerCorrectness: domain.answerCorrectness,
      completionTime: domain.completionTime,
      createdAt: domain.createdAt,
    }
  }

  toDTO(domain: EnrolledSubQuiz): EnrolledSubQuizDTO {
    return new EnrolledSubQuizDTO(
      domain.enrolledSubQuizType,
      domain.userId,
      domain.quizId,
      domain.subQuizType,
      domain.subQuizId,
      domain.points,
      domain.isCompleted,
      domain.answerCorrectness,
      domain.completionTime,
      domain.createdAt,
    )
  }
}
