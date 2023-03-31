import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import User from '../users/users.domain'

export type RefreshDocument = HydratedDocument<Refresh>

@Schema()
export class Refresh {
  @Prop(String)
  token: string

  @Prop(Date)
  expiresIn: Date

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Models.users,
    required: true,
  })
  owner: User | string
}

export const RefreshSchema = SchemaFactory.createForClass(Refresh)
