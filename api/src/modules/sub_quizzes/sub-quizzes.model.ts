import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import Quiz from '../quizzes/quizzes.domain'

export type SubQuizDocument = HydratedDocument<SubQuiz>

@Schema({ discriminatorKey: '__type' })
export class SubQuiz extends Document {
  @Prop({
    type: String,
    required: true,
    enum: [Models.multipleChoiceQuestion, Models.uniqueChoiceQuestion, Models.trueFalseQuestion],
  })
  __type: string

  @Prop({ type: mongoose.Types.ObjectId, ref: Models.quizzes, required: true })
  quizId: Quiz | string

  @Prop(String)
  title: string

  @Prop(String)
  coverImageURL?: string

  @Prop(Number)
  points: number

  @Prop(Number)
  timeLimit: number

  @Prop({ type: Number, max: 3, min: 1 })
  dificulity: number
}

export const SubQuizSchema = SchemaFactory.createForClass(SubQuiz)
