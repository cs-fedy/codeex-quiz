import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import Quiz from '../quizzes/quizzes.domain'
import Collection from './collection-quizzes.domain'

export type CollectionQuizDocument = HydratedDocument<CollectionQuiz>

@Schema()
class CollectionQuiz {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Models.collections,
    required: true,
  })
  collectionId: Collection | string

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Models.quizzes,
    required: true,
  })
  quizId: Quiz | string
}

export const CollectionQuizSchema = SchemaFactory.createForClass(CollectionQuiz)
