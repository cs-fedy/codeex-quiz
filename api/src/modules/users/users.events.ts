import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { Jobs, Queues } from 'src/utils/constants'
import IUserEvents, { NewUserExistArgs } from './i-users.events'

@Injectable()
export default class UserEvents implements IUserEvents {
  constructor(@InjectQueue(Queues.users) private userQueue: Queue) {}

  async newUserExist(args: NewUserExistArgs): Promise<void> {
    await this.userQueue.add(Jobs.newUserExist, args)
  }
}
