import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import EnrolledMultipleChoiceQuestion from './enrolled-multiple-choice-questions.domain'
import EnrolledMultipleChoiceQuestionDTO from './enrolled-multiple-choice-questions.dto'
import { EnrolledMultipleChoiceQuestionDocument } from './enrolled-multiple-choice-questions.model'
import IEnrolledMultipleChoiceQuestionRepo from './i-enrolled-multiple-choice-questions.repository'

@Injectable()
export default class EnrolledMultipleChoiceQuestionRepo
  implements IEnrolledMultipleChoiceQuestionRepo
{
  constructor(
    @InjectModel(Models.enrolledMultipleChoiceQuestions)
    private enrolledMultipleChoiceQuestionModel: Model<EnrolledMultipleChoiceQuestionDocument>,
    @Inject(Mappers.enrolledMultipleChoiceQuestion)
    private enrolledMultipleChoiceQuestionMapper: IMapper<
      EnrolledMultipleChoiceQuestion,
      EnrolledMultipleChoiceQuestionDTO
    >,
  ) {}

  async saveEnrolledMultipleChoiceQuestion(
    args: EnrolledMultipleChoiceQuestion,
  ): Promise<EnrolledMultipleChoiceQuestion> {
    const newEnrolledMultipleChoiceQuestion =
      this.enrolledMultipleChoiceQuestionMapper.toPersistence(args)
    const savedEnrolledMultipleChoiceQuestion =
      await this.enrolledMultipleChoiceQuestionModel.findOneAndUpdate(
        { userId: args.userId, quizId: args.quizId, subQuizId: args.subQuizId },
        newEnrolledMultipleChoiceQuestion,
        { upsert: true, new: true },
      )

    return this.enrolledMultipleChoiceQuestionMapper.toDomain(savedEnrolledMultipleChoiceQuestion)
  }

  async getEnrolledMultipleChoiceQuestion(
    userId: string,
    quizId: string,
    subQuizId: string,
  ): Promise<EnrolledMultipleChoiceQuestion | null> {
    const enrolledMultipleChoiceQuestion = await this.enrolledMultipleChoiceQuestionModel.findOne({
      userId: userId,
      quizId: quizId,
      subQuizId: subQuizId,
    })

    return enrolledMultipleChoiceQuestion
      ? this.enrolledMultipleChoiceQuestionMapper.toDomain(enrolledMultipleChoiceQuestion)
      : null
  }
}
