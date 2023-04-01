import { Injectable } from '@nestjs/common'
import * as SendGrid from '@sendgrid/mail'
import IMailService, { SendEmailArgs } from './i-mail.services'

@Injectable()
export class MailService implements IMailService {
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_KEY)
  }

  async sendEmail(args: SendEmailArgs) {
    await SendGrid.send(args)
  }
}
