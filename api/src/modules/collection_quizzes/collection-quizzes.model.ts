import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import { Collection } from '../collections/collections.model'
import { Quiz } from '../quizzes/quizzes.model'

export type CollectionQuizDocument = HydratedDocument<CollectionQuiz>

@Schema()
export class CollectionQuiz {
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
