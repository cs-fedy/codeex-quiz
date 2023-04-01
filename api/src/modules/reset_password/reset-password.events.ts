import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { Jobs, Queues } from 'src/utils/constants'
import IResetPasswordEvents, {
  NewPasswordUpdatedArgs,
  NewResetPasswordRequestArgs,
} from './i-reset-password.events'

@Injectable()
export default class ResetPasswordEvents implements IResetPasswordEvents {
  constructor(@InjectQueue(Queues.resetPassword) private resetPasswordQueue: Queue) {}

  async newResetPasswordRequest(args: NewResetPasswordRequestArgs): Promise<void> {
    await this.resetPasswordQueue.add(Jobs.newResetPasswordRequest, args)
  }

  async newPasswordUpdated(args: NewPasswordUpdatedArgs): Promise<void> {
    await this.resetPasswordQueue.add(Jobs.newPasswordUpdated, args)
  }
}
