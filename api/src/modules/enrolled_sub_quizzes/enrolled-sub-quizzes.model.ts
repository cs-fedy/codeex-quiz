import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import { MultipleChoiceQuestion } from '../multiple_choice_questions/multiple-choice-questions.model'
import { Quiz } from '../quizzes/quizzes.model'
import { TrueFalseQuestion } from '../true_false_questions/true-false-questions.model'
import { UniqueChoiceQuestion } from '../unique_choice_questions/unique-choice-questions.model'
import { User } from '../users/users.model'

export type EnrolledSubQuizDocument = HydratedDocument<EnrolledSubQuiz>

@Schema({ discriminatorKey: '__type' })
export class EnrolledSubQuiz {
  @Prop({
    type: String,
    required: true,
    enum: [
      Models.enrolledMultipleChoiceQuestions,
      Models.enrolledUniqueChoiceQuestions,
      Models.enrolledTrueFalseQuestions,
    ],
  })
  __type: string

  @Prop({ type: mongoose.Types.ObjectId, ref: Models.users, required: true })
  userId: User | string

  @Prop({ type: mongoose.Types.ObjectId, ref: Models.quizzes, required: true })
  quizId: Quiz | string

  @Prop({
    type: String,
    required: true,
    enum: [Models.multipleChoiceQuestion, Models.uniqueChoiceQuestion, Models.trueFalseQuestion],
  })
  subQuizType: string

  @Prop({ type: mongoose.Types.ObjectId, refPath: 'subQuizType' })
  subQuizId: MultipleChoiceQuestion | UniqueChoiceQuestion | TrueFalseQuestion | string

  @Prop({ type: Number, default: 0 })
  points: number

  @Prop({ type: Boolean, default: false })
  isCompleted: boolean

  @Prop(Boolean)
  answerCorrectness: boolean

  @Prop({ type: Number, min: -1 })
  completionTime: number
}

export const EnrolledSubQuizSchema = SchemaFactory.createForClass(EnrolledSubQuiz)
