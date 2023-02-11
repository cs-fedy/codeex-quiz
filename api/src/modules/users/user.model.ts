import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
class User {
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
  roles: Array<string>
}

export const UserSchema = SchemaFactory.createForClass(User)
