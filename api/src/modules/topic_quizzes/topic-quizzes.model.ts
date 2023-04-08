import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'

export type TopicQuizDocument = HydratedDocument<TopicQuiz>

@Schema()
export class TopicQuiz {
  @Prop({ type: mongoose.Types.ObjectId, ref: Models.quizzes, required: true })
  quizId: string

  @Prop({ type: mongoose.Types.ObjectId, ref: Models.topics, required: true })
  topicId: string
}

export const TopicQuizSchema = SchemaFactory.createForClass(TopicQuiz)
