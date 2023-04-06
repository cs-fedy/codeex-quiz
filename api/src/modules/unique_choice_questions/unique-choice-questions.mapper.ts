import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import UniqueChoiceQuestion from './unique-choice-question.domain'
import UniqueChoiceQuestionDTO from './unique-choice-questions.dto'

@Injectable()
export default class UniqueChoiceQuestionMapper
  implements IMapper<UniqueChoiceQuestion, UniqueChoiceQuestionDTO>
{
  toDomain(raw: any): UniqueChoiceQuestion {
    return new UniqueChoiceQuestion(
      raw._id,
      raw.__type,
      raw.quizId,
      raw.title,
      raw.options,
      raw.idealOption,
      raw.points,
      raw.timeLimit,
      raw.dificulity,
      raw.coverImageURL,
      raw.prevSubQuizId,
      raw.nextSubQuizId,
    )
  }

  toPersistence(domain: UniqueChoiceQuestion): any {
    return {
      _id: domain.subQuizId,
      __type: domain.type,
      quizId: domain.quizId,
      title: domain.title,
      options: domain.options,
      idealOption: domain.idealOption,
      points: domain.points,
      timeLimit: domain.timeLimit,
      dificulity: domain.dificulity,
      coverImageURL: domain.coverImageURL,
      prevSubQuizId: domain.prevSubQuizId,
      nextSubQuizId: domain.nextSubQuizId,
    }
  }

  toDTO(domain: UniqueChoiceQuestion): UniqueChoiceQuestionDTO {
    return new UniqueChoiceQuestionDTO(
      domain.subQuizId,
      domain.type,
      domain.quizId,
      domain.title,
      domain.options,
      domain.idealOption,
      domain.points,
      domain.timeLimit,
      domain.dificulity,
      domain.coverImageURL,
      domain.prevSubQuizId,
      domain.nextSubQuizId,
    )
  }
}
