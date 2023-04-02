import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import IUniqueChoiceQuestionRepo from './i-unique-choice-questions.repository'
import UniqueChoiceQuestion from './unique-choice-question.domain'
import UniqueChoiceQuestionDTO from './unique-choice-questions.dto'
import { UniqueChoiceQuestionDocument } from './unique-choice-questions.model'

@Injectable()
export default class UniqueChoiceQuestionRepo implements IUniqueChoiceQuestionRepo {
  constructor(
    @InjectModel(Models.uniqueChoiceQuestion)
    private uniqueChoiceQuestionModel: Model<UniqueChoiceQuestionDocument>,
    @Inject(Mappers.uniqueChoiceQuestion)
    private uniqueChoiceQuestionMapper: IMapper<UniqueChoiceQuestion, UniqueChoiceQuestionDTO>,
  ) {}

  async saveUniqueChoiceQuestion(args: UniqueChoiceQuestion): Promise<UniqueChoiceQuestion> {
    const newUniqueChoiceQuestion = this.uniqueChoiceQuestionMapper.toPersistence(args)
    const savedUniqueChoiceQuestion = await this.uniqueChoiceQuestionModel.findByIdAndUpdate(
      args.subQuizId,
      newUniqueChoiceQuestion,
      {
        upsert: true,
        new: true,
      },
    )

    return this.uniqueChoiceQuestionMapper.toDomain(savedUniqueChoiceQuestion)
  }

  async getUniqueChoiceQuestion(subQuizId: string): Promise<UniqueChoiceQuestion | null> {
    const subQuiz = await this.uniqueChoiceQuestionModel.findById(subQuizId)
    const mappedSubQuiz = this.uniqueChoiceQuestionMapper.toDomain(subQuiz)
    return mappedSubQuiz
  }
}
