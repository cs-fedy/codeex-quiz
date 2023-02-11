import { Injectable } from '@nestjs/common'
import * as SendGrid from '@sendgrid/mail'

@Injectable()
export class MailService {
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_KEY)
  }

  async send(mail: SendGrid.MailDataRequired) {
    return await SendGrid.send(mail)
  }
}
