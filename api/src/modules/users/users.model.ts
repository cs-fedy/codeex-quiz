import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'
import { Roles } from 'src/utils/constants'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User extends Document {
  @Prop(String)
  email: string

  @Prop(String)
  password: string

  @Prop(String)
  fullName: string

  @Prop(String)
  username: string

  @Prop(String)
  avatarURL: string

  @Prop([String])
  roles: Array<Roles>

  @Prop(Boolean)
  isConfirmed: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)
