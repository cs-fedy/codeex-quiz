import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { Jobs, Queues } from 'src/utils/constants'
import IAccountEvents, { NewConfirmEmailRequestArgs } from './iaccount.events'

@Injectable()
export default class AccountEvents implements IAccountEvents {
  constructor(@InjectQueue(Queues.accounts) private accountQueue: Queue) {}

  async newConfirmEmailRequest(args: NewConfirmEmailRequestArgs): Promise<void> {
    await this.accountQueue.add(Jobs.newConfirmEmailRequest, args)
  }
}
