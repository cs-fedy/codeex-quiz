import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

export default interface IHash {
  hash(rawObject: any): Promise<string>
  compare(plainObject: any, hashed: string): Promise<boolean>
}

@Injectable()
export class Hash implements IHash {
  async hash(plainObject: any): Promise<string> {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(plainObject, salt)
  }

  async compare(data: any, hashed: string): Promise<boolean> {
    return await bcrypt.compare(data, hashed)
  }
}
