import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import MultipleChoiceQuestion from '../multiple_choice_questions/multiple-choice-question.domain'
import EnrolledMultipleChoiceQuestion from './enrolled-multiple-choice-questions.domain'
import EnrolledMultipleChoiceQuestionDTO from './enrolled-multiple-choice-questions.dto'

@Injectable()
export default class EnrolledMultipleChoiceQuestionMapper
  implements IMapper<EnrolledMultipleChoiceQuestion, EnrolledMultipleChoiceQuestionDTO>
{
  toDomain(raw: any): EnrolledMultipleChoiceQuestion {
    return new EnrolledMultipleChoiceQuestion(
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

  toPersistence(domain: EnrolledMultipleChoiceQuestion): any {
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

  toDTO(domain: EnrolledMultipleChoiceQuestion): EnrolledMultipleChoiceQuestionDTO {
    const subQuiz = domain.subQuizId as MultipleChoiceQuestion
    return new EnrolledMultipleChoiceQuestionDTO(
      domain.enrolledSubQuizType,
      domain.userId,
      domain.quizId,
      domain.subQuizType,
      {
        subQuizId: subQuiz.subQuizId,
        type: subQuiz.type,
        quizId: subQuiz.quizId,
        title: subQuiz.title,
        options: subQuiz.options,
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
