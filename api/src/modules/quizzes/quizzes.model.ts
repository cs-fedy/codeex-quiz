import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import User from '../users/users.domain'

export type QuizDocument = HydratedDocument<Quiz>

@Schema()
export class Quiz extends Document {
  @Prop(String)
  title: string

  @Prop(String)
  description: string

  @Prop(String)
  coverImageURL: string

  @Prop(Boolean)
  isVisible: boolean

  @Prop(Boolean)
  isApproved: boolean

  @Prop({ type: mongoose.Types.ObjectId, ref: Models.users, required: true })
  creator: User | string
}

export const QuizSchema = SchemaFactory.createForClass(Quiz)
