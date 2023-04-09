import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, now } from 'mongoose'
import { Models } from 'src/utils/constants'
import { User } from '../users/users.model'

export type LeaderboardDocument = HydratedDocument<Leaderboard>

@Schema({ timestamps: true })
export class Leaderboard {
  @Prop({ type: mongoose.Types.ObjectId, ref: Models.users, required: true })
  userId: User | string

  @Prop(Number)
  points: number

  @Prop({ type: Number, default: 0, index: true })
  version: number

  @Prop({ type: Date, default: now() })
  createdAt: Date
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard)
