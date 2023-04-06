import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import UniqueChoiceQuestion from '../unique_choice_questions/unique-choice-question.domain'
import EnrolledUniqueChoiceQuestion from './enrolled-unique-choice-questions.domain'
import EnrolledUniqueChoiceQuestionDTO from './enrolled-unique-choice-questions.dto'

@Injectable()
export default class EnrolledUniqueChoiceQuestionMapper
  implements IMapper<EnrolledUniqueChoiceQuestion, EnrolledUniqueChoiceQuestionDTO>
{
  toDomain(raw: any): EnrolledUniqueChoiceQuestion {
    return new EnrolledUniqueChoiceQuestion(
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

  toPersistence(domain: EnrolledUniqueChoiceQuestion): any {
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

  toDTO(domain: EnrolledUniqueChoiceQuestion): EnrolledUniqueChoiceQuestionDTO {
    const subQuiz = domain.subQuizId as UniqueChoiceQuestion
    return new EnrolledUniqueChoiceQuestionDTO(
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
