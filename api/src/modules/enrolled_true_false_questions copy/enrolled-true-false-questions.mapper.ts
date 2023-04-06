import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import TrueFalseQuestion from '../true_false_questions/true-false-question.domain'
import EnrolledTrueFalseQuestion from './enrolled-true-false-questions.domain'
import EnrolledTrueFalseQuestionDTO from './enrolled-true-false-questions.dto'

@Injectable()
export default class EnrolledTrueFalseQuestionMapper
  implements IMapper<EnrolledTrueFalseQuestion, EnrolledTrueFalseQuestionDTO>
{
  toDomain(raw: any): EnrolledTrueFalseQuestion {
    return new EnrolledTrueFalseQuestion(
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
      raw.userAnswer,
    )
  }

  toPersistence(domain: EnrolledTrueFalseQuestion): any {
    return {
      __type: domain.enrolledSubQuizType,
      userId: domain.userId,
      quizId: domain.quizId,
      subQuizType: domain.subQuizType,
      subQuizId: domain.subQuizId as string,
      points: domain.points,
      isCompleted: domain.isCompleted,
      answerCorrectness: domain.answerCorrectness,
      completionTime: domain.completionTime,
      createdAt: domain.createdAt,
      userAnswer: domain.userAnswer,
    }
  }

  toDTO(domain: EnrolledTrueFalseQuestion): EnrolledTrueFalseQuestionDTO {
    const subQuiz = domain.subQuizId as TrueFalseQuestion
    return new EnrolledTrueFalseQuestionDTO(
      domain.enrolledSubQuizType,
      domain.userId,
      domain.quizId,
      domain.subQuizType,
      {
        subQuizId: subQuiz.subQuizId,
        type: subQuiz.type,
        quizId: subQuiz.quizId,
        title: subQuiz.title,
        points: subQuiz.points,
        timeLimit: subQuiz.timeLimit,
        dificulity: subQuiz.dificulity,
        coverImageURL: subQuiz.coverImageURL,
      },
      domain.points,
      domain.isCompleted,
      domain.answerCorrectness,
      domain.completionTime,
      domain.createdAt,
      domain.userAnswer,
    )
  }
}
