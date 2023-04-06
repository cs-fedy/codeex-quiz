import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import EnrolledTrueFalseQuestion from './enrolled-true-false-questions.domain'
import EnrolledTrueFalseQuestionDTO from './enrolled-true-false-questions.dto'
import { EnrolledTrueFalseQuestionDocument } from './enrolled-true-false-questions.model'
import IEnrolledTrueFalseQuestionRepo from './i-enrolled-true-false-questions.repository'

@Injectable()
export default class EnrolledTrueFalseQuestionRepo implements IEnrolledTrueFalseQuestionRepo {
  constructor(
    @InjectModel(Models.enrolledTrueFalseQuestions)
    private enrolledTrueFalseQuestionModel: Model<EnrolledTrueFalseQuestionDocument>,
    @Inject(Mappers.enrolledTrueFalseQuestion)
    private enrolledTrueFalseQuestionMapper: IMapper<
      EnrolledTrueFalseQuestion,
      EnrolledTrueFalseQuestionDTO
    >,
  ) {}

  async saveEnrolledTrueFalseQuestion(
    args: EnrolledTrueFalseQuestion,
  ): Promise<EnrolledTrueFalseQuestion> {
    const newEnrolledTrueFalseQuestion = this.enrolledTrueFalseQuestionMapper.toPersistence(args)
    const savedEnrolledTrueFalseQuestion =
      await this.enrolledTrueFalseQuestionModel.findOneAndUpdate(
        { userId: args.userId, quizId: args.quizId, subQuizId: args.subQuizId },
        newEnrolledTrueFalseQuestion,
        { upsert: true, new: true },
      )

    return this.enrolledTrueFalseQuestionMapper.toDomain(savedEnrolledTrueFalseQuestion)
  }

  async getEnrolledTrueFalseQuestion(
    userId: string,
    quizId: string,
    subQuizId: string,
  ): Promise<EnrolledTrueFalseQuestion | null> {
    const enrolledTrueFalseQuestion = await this.enrolledTrueFalseQuestionModel.findOne({
      userId: userId,
      quizId: quizId,
      subQuizId: subQuizId,
    })

    return enrolledTrueFalseQuestion
      ? this.enrolledTrueFalseQuestionMapper.toDomain(enrolledTrueFalseQuestion)
      : null
  }
}
