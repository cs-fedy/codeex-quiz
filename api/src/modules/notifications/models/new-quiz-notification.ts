import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Models, NotificationStatus } from 'src/utils/constants'
import Quiz from '../../quizzes/quizzes.domain'
import User from '../../users/users.domain'

export type NewQuizNotificationDocument = HydratedDocument<NewQuizNotification>

@Schema()
export class NewQuizNotification {
  __type: string
  emitter: User | string
  status: NotificationStatus
  emittedAt: Date

  @Prop({ type: mongoose.Types.ObjectId, ref: Models.quizzes, required: true })
  quizId: Quiz | string

  @Prop(String)
  decision?: string
}

export const NewQuizNotificationSchema = SchemaFactory.createForClass(NewQuizNotification)
