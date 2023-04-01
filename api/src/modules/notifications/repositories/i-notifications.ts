import { Notification } from '../models/notifications'

export default interface INotificationRepo {
  listNotificationByEmitterId(emitterId: string): Promise<Array<Notification>>
}
