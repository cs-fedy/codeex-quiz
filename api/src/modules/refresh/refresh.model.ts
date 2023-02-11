import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import User from '../users/user.domain'

export type RefreshDocument = HydratedDocument<Refresh>

@Schema()
class Refresh {
  @Prop(String)
  token: string

  @Prop(Date)
  expiresIn: Date

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Models.user,
    required: true,
  })
  roles: User
}

export const RefreshSchema = SchemaFactory.createForClass(Refresh)
