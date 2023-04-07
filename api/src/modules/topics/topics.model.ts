import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'

export type TopicsDocument = HydratedDocument<Topic>

export class Topic extends Document {
  @Prop(String)
  label: string
}

export const TopicSchema = SchemaFactory.createForClass(Topic)
