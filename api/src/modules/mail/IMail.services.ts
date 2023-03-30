export type SendEmailArgs = {
  to: string | Array<string>
  from: string
  subject: string
  text: string
}

export default interface IMailService {
  sendEmail(args: SendEmailArgs): Promise<void>
}
