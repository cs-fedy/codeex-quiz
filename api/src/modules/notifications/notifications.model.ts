import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, HydratedDocument } from 'mongoose'
import { Models, NotificationStatus } from 'src/utils/constants'
import User from '../users/users.domain'

export type NotificationDocument = HydratedDocument<Notification>

@Schema({ discriminatorKey: '__type' })
export class Notification extends Document {
  @Prop({
    type: String,
    required: true,
    enum: [Models.newQuizzes],
  })
  __type: string

  @Prop({ type: mongoose.Types.ObjectId, ref: Models.users, required: true })
  emitter: User | string

  @Prop(String)
  status: NotificationStatus

  @Prop(Date)
  emittedAt: Date
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)
