import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import MultipleChoiceQuestion from './multiple-choice-question.domain'
import MultipleChoiceQuestionDTO from './multiple-choice-questions.dto'

@Injectable()
export default class MultipleChoiceQuestionMapper
  implements IMapper<MultipleChoiceQuestion, MultipleChoiceQuestionDTO>
{
  toDomain(raw: any): MultipleChoiceQuestion {
    return new MultipleChoiceQuestion(
      raw._id,
      raw.__type,
      raw.quizId,
      raw.title,
      raw.options,
      raw.idealOptions,
      raw.coverImageURL,
    )
  }

  toPersistence(domain: MultipleChoiceQuestion): any {
    return {
      _id: domain.subQuizId,
      __type: domain.type,
      quizId: domain.quizId,
      title: domain.title,
      options: domain.options,
      idealOptions: domain.idealOptions,
      coverImageURL: domain.coverImageURL,
    }
  }

  toDTO(domain: MultipleChoiceQuestion): MultipleChoiceQuestionDTO {
    return new MultipleChoiceQuestionDTO(
      domain.subQuizId,
      domain.type,
      domain.quizId,
      domain.title,
      domain.options,
      domain.idealOptions,
      domain.coverImageURL,
    )
  }
}
