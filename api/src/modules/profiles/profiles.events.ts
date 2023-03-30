import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { Jobs, Queues } from 'src/utils/constants'
import IProfileEvents, { NewEmailUpdatedArgs, NewPasswordUpdatedArgs } from './IProfiles.events'

@Injectable()
export default class ProfileEvents implements IProfileEvents {
  constructor(@InjectQueue(Queues.profiles) private profileQueue: Queue) {}

  async newEmailUpdated(args: NewEmailUpdatedArgs): Promise<void> {
    await this.profileQueue.add(Jobs.newProfileEmailUpdated, args)
  }

  async newPasswordUpdated(args: NewPasswordUpdatedArgs): Promise<void> {
    await this.profileQueue.add(Jobs.newProfilePasswordUpdated, args)
  }
}
