import { NotificationStatus } from 'src/utils/constants'

export default interface Notification {
  notificationId: string
  type: string
  emitter: string
  status: NotificationStatus
  emittedAt: Date
}
