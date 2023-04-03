import { Controller, UseGuards } from '@nestjs/common'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes } from 'src/utils/constants'

@Controller(Routes.enrolledQuizzes)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.user))
export default class EnrolledQuizController {}
