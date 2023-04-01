import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import IMultipleChoiceQuestionRepo from './i-multiple-choice-questions.repository'
import MultipleChoiceQuestion from './multiple-choice-question.domain'
import MultipleChoiceQuestionDTO from './multiple-choice-questions.dto'
import { MultipleChoiceQuestionDocument } from './multiple-choice-questions.model'

@Injectable()
export default class MultipleChoiceQuestionRepo implements IMultipleChoiceQuestionRepo {
  constructor(
    @InjectModel(Models.multipleChoiceQuestion)
    private multipleChoiceQuestionModel: Model<MultipleChoiceQuestionDocument>,
    @Inject(Mappers.multipleChoiceQuestion)
    private multipleChoiceQuestionMapper: IMapper<
      MultipleChoiceQuestion,
      MultipleChoiceQuestionDTO
    >,
  ) {}

  async saveMultipleChoiceQuestion(args: MultipleChoiceQuestion): Promise<MultipleChoiceQuestion> {
    const newMultipleChoiceQuestion = this.multipleChoiceQuestionMapper.toPersistence(args)
    const savedMultipleChoiceQuestion = await this.multipleChoiceQuestionModel.findByIdAndUpdate(
      args.subQuizId,
      newMultipleChoiceQuestion,
      {
        upsert: true,
        new: true,
      },
    )

    return this.multipleChoiceQuestionMapper.toDomain(savedMultipleChoiceQuestion)
  }
}
