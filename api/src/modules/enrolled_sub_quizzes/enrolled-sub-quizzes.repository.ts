import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import EnrolledSubQuiz from './enrolled-sub-quizzes.domain'
import EnrolledSubQuizDTO from './enrolled-sub-quizzes.dto'
import { EnrolledSubQuizDocument } from './enrolled-sub-quizzes.model'
import IEnrolledSubQuizRepo from './i-enrolled-quizzes.repository'

@Injectable()
export default class EnrolledSubQuizRepo implements IEnrolledSubQuizRepo {
  constructor(
    @Inject(Mappers.enrolledSubQuiz)
    private enrolledSubQuizMapper: IMapper<EnrolledSubQuiz, EnrolledSubQuizDTO>,
    @InjectModel(Models.enrolledSubQuizzes)
    private enrolledSubQuizModel: Model<EnrolledSubQuizDocument>,
  ) {}

  async listEnrolledSubQuizzes(userId: string, quizId: string): Promise<Array<EnrolledSubQuiz>> {
    const enrolledSubQuizzes = await this.enrolledSubQuizModel.find({ userId, quizId })
    const mappedEnrolledSubQuizzes = enrolledSubQuizzes.map(this.enrolledSubQuizMapper.toDomain)
    return mappedEnrolledSubQuizzes
  }
}
