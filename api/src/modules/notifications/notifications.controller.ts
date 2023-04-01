import { Body, Controller, Get, Inject, UseGuards } from '@nestjs/common'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import INotificationService from './i-notifications.services'

@Controller(Routes.newQuizzes)
@UseGuards(AccountConfirmedGuard())
export default class NotificationController {
  constructor(@Inject(Services.notification) private notificationService: INotificationService) {}

  @Get(Routes.emitter)
  @UseGuards(RoleGuard(Roles.self))
  async listEmitterNotifications(@Body('userId') userId: string) {
    const notifications = await this.notificationService.listEmitterNotifications(userId)
    if (notifications.isRight()) {
      return { notifications: notifications.value }
    }
  }

  @Get(Routes.newQuizzes)
  @UseGuards(RoleGuard(Roles.admin))
  async listNewQuizNotification() {
    const notifications = await this.notificationService.listNewQuizNotifications()
    if (notifications.isRight()) {
      return { notifications: notifications.value }
    }
  }
}
