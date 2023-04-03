import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import { Quiz } from '../quizzes/quizzes.model'
import { User } from '../users/users.model'

export type EnrolledQuizDocument = HydratedDocument<EnrolledQuiz>

@Schema()
export class EnrolledQuiz {
  @Prop({ type: mongoose.Types.ObjectId, ref: Models.users, required: true })
  userId: User | string

  @Prop({ type: mongoose.Types.ObjectId, ref: Models.quizzes, required: true })
  quizId: Quiz | string

  @Prop({ type: Number, default: 0 })
  completedSubQuizzesCount: number

  @Prop({ type: Number, default: 0 })
  points: number
}

export const EnrolledQuizSchema = SchemaFactory.createForClass(EnrolledQuiz)
