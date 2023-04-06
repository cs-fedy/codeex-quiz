import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import EnrolledUniqueChoiceQuestion from './enrolled-unique-choice-questions.domain'
import EnrolledUniqueChoiceQuestionDTO from './enrolled-unique-choice-questions.dto'
import { EnrolledUniqueChoiceQuestionDocument } from './enrolled-unique-choice-questions.model'
import IEnrolledUniqueChoiceQuestionRepo from './i-enrolled-unique-choice-questions.repository'

@Injectable()
export default class EnrolledUniqueChoiceQuestionRepo implements IEnrolledUniqueChoiceQuestionRepo {
  constructor(
    @InjectModel(Models.enrolledUniqueChoiceQuestions)
    private enrolledUniqueChoiceQuestionModel: Model<EnrolledUniqueChoiceQuestionDocument>,
    @Inject(Mappers.enrolledUniqueChoiceQuestion)
    private enrolledUniqueChoiceQuestionMapper: IMapper<
      EnrolledUniqueChoiceQuestion,
      EnrolledUniqueChoiceQuestionDTO
    >,
  ) {}

  async saveEnrolledUniqueChoiceQuestion(
    args: EnrolledUniqueChoiceQuestion,
  ): Promise<EnrolledUniqueChoiceQuestion> {
    const newEnrolledUniqueChoiceQuestion =
      this.enrolledUniqueChoiceQuestionMapper.toPersistence(args)
    const savedEnrolledUniqueChoiceQuestion =
      await this.enrolledUniqueChoiceQuestionModel.findOneAndUpdate(
        { userId: args.userId, quizId: args.quizId, subQuizId: args.subQuizId },
        newEnrolledUniqueChoiceQuestion,
        { upsert: true, new: true },
      )

    return this.enrolledUniqueChoiceQuestionMapper.toDomain(savedEnrolledUniqueChoiceQuestion)
  }

  async getEnrolledUniqueChoiceQuestion(
    userId: string,
    quizId: string,
    subQuizId: string,
  ): Promise<EnrolledUniqueChoiceQuestion | null> {
    const enrolledUniqueChoiceQuestion = await this.enrolledUniqueChoiceQuestionModel.findOne({
      userId: userId,
      quizId: quizId,
      subQuizId: subQuizId,
    })

    return enrolledUniqueChoiceQuestion
      ? this.enrolledUniqueChoiceQuestionMapper.toDomain(enrolledUniqueChoiceQuestion)
      : null
  }
}
