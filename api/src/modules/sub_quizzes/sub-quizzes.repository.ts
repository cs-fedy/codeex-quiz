import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import ISubQuizRepo from './i-sub-quizzes.repository'
import SubQuiz from './sub-quizzes.domain'
import SubQuizDTO from './sub-quizzes.dto'
import { SubQuizDocument } from './sub-quizzes.model'

@Injectable()
export default class SubQuizRepo implements ISubQuizRepo {
  constructor(
    @InjectModel(Models.subQuizzes) private subQuizModel: Model<SubQuizDocument>,
    @Inject(Mappers.subQuiz) private subQuizMapper: IMapper<SubQuiz, SubQuizDTO>,
  ) {}

  async listQuizSubQuizzes(quizId: string): Promise<Array<SubQuiz>> {
    const subQuizzes = await this.subQuizModel.find({ quizId })
    const mappedSubQuizzes = subQuizzes.map(this.subQuizMapper.toDomain)
    return mappedSubQuizzes
  }
}
