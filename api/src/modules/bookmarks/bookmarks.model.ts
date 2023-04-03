import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import { Quiz } from '../quizzes/quizzes.model'
import { User } from '../users/users.model'

export type BookmarkDocument = HydratedDocument<Bookmark>

@Schema()
export class Bookmark {
  @Prop({ type: mongoose.Types.ObjectId, ref: Models.quizzes, required: true })
  quizId: Quiz | string

  @Prop({ type: mongoose.Types.ObjectId, ref: Models.users, required: true })
  userId: User | string
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark)
