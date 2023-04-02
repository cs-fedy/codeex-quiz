import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import ITrueFalseQuestionRepo from './i-true-false-questions.repository'
import TrueFalseQuestion from './true-false-question.domain'
import TrueFalseQuestionDTO from './true-false-questions.dto'
import { TrueFalseQuestionDocument } from './true-false-questions.model'

@Injectable()
export default class TrueFalseQuestionRepo implements ITrueFalseQuestionRepo {
  constructor(
    @InjectModel(Models.trueFalseQuestion)
    private trueFalseQuestionModel: Model<TrueFalseQuestionDocument>,
    @Inject(Mappers.trueFalseQuestion)
    private trueFalseQuestionMapper: IMapper<TrueFalseQuestion, TrueFalseQuestionDTO>,
  ) {}

  async saveTrueFalseQuestion(args: TrueFalseQuestion): Promise<TrueFalseQuestion> {
    const newTrueFalseQuestion = this.trueFalseQuestionMapper.toPersistence(args)
    const savedTrueFalseQuestion = await this.trueFalseQuestionModel.findByIdAndUpdate(
      args.subQuizId,
      newTrueFalseQuestion,
      {
        upsert: true,
        new: true,
      },
    )

    return this.trueFalseQuestionMapper.toDomain(savedTrueFalseQuestion)
  }

  async getTrueFalseQuestion(subQuizId: string): Promise<TrueFalseQuestion | null> {
    const subQuiz = await this.trueFalseQuestionModel.findById(subQuizId)
    const mappedSubQuiz = this.trueFalseQuestionMapper.toDomain(subQuiz)
    return mappedSubQuiz
  }
}
