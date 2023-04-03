import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import EnrolledQuiz from './enrolled-quizzes.domain'
import EnrolledQuizDTO from './enrolled-quizzes.dto'
import { EnrolledQuizDocument } from './enrolled-quizzes.model'
import IEnrolledQuizRepo from './i-enrolled-quizzes.repository'

@Injectable()
export default class EnrolledQuizRepo implements IEnrolledQuizRepo {
  constructor(
    @InjectModel(Models.enrolledQuizzes) private enrolledQuizModel: Model<EnrolledQuizDocument>,
    @Inject(Mappers.enrolledQuiz)
    private enrolledQuizMapper: IMapper<EnrolledQuiz, EnrolledQuizDTO>,
  ) {}

  async saveEnrolledQuiz(args: EnrolledQuiz): Promise<EnrolledQuiz> {
    const newEnrolledQuiz = this.enrolledQuizMapper.toPersistence(args)
    const savedEnrolledQuiz = await this.enrolledQuizModel.findOneAndUpdate(
      { userId: args.userId, quizId: args.quizId },
      newEnrolledQuiz,
      { upsert: true, new: true },
    )

    return this.enrolledQuizMapper.toDomain(savedEnrolledQuiz)
  }

  async isEnrolled(userId: string, quizId: string): Promise<boolean> {
    const enrolledQuiz = await this.enrolledQuizModel.findOne({ userId, quizId })
    return !!enrolledQuiz
  }

  async listEnrolledQuizzes(userId: string): Promise<Array<EnrolledQuiz>> {
    const quizzes = await this.enrolledQuizModel.find({ userId })
    const mappedQuizzes = quizzes.map(this.enrolledQuizMapper.toDomain)
    return mappedQuizzes
  }

  async getEnrolledQuiz(userId: string, quizId: string): Promise<EnrolledQuiz | null> {
    const enrolledQuiz = await this.enrolledQuizModel.findOne({ userId, quizId })
    return enrolledQuiz ? this.enrolledQuizMapper.toDomain(enrolledQuiz) : null
  }
}
