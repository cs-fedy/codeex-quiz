import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import { User } from '../users/users.model'

export type CollectionDocument = HydratedDocument<Collection>

@Schema()
export class Collection extends Document {
  @Prop(String)
  title: string

  @Prop(String)
  coverImageURL: string

  @Prop(Boolean)
  isVisible: boolean

  @Prop({ type: mongoose.Types.ObjectId, ref: Models.users, required: true })
  creator: User | string
}

export const CollectionSchema = SchemaFactory.createForClass(Collection)
