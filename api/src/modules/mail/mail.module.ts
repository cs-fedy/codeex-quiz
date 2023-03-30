import { Module } from '@nestjs/common'
import { Services } from 'src/utils/constants'
import { MailService } from './mail.services'

@Module({
  providers: [{ provide: Services.mail, useClass: MailService }],
  exports: [{ provide: Services.mail, useClass: MailService }],
})
export default class MailModule {}
