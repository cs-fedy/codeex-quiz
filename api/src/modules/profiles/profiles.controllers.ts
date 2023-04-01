import { Body, Controller, HttpException, Inject, Patch, UseGuards } from '@nestjs/common'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import IProfileService from './i-profiles.services'
import UpdateEmailArgs from './validators/update-email'
import UpdatePasswordArgs from './validators/update-password'
import UpdateProfileArgs from './validators/update-profile'

@Controller(Routes.profiles)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.self))
export default class ProfileController {
  constructor(@Inject(Services.profile) private profileService: IProfileService) {}

  @Patch()
  async updateProfile(@Body() args: UpdateProfileArgs) {
    const updatedProfile = await this.profileService.updateProfile(args)
    if (updatedProfile.isRight()) return { updatedProfile: updatedProfile.value }
    return {}
  }

  @Patch(Routes.email)
  async updateEmail(@Body() args: UpdateEmailArgs) {
    const updatedProfile = await this.profileService.updateEmail(args)
    if (updatedProfile.isLeft()) {
      const { code, status, message } = updatedProfile.error
      throw new HttpException({ message, code }, status)
    }

    return { updatedProfile: updatedProfile.value }
  }

  @Patch(Routes.password)
  async updatePassword(@Body() args: UpdatePasswordArgs) {
    const updatedProfile = await this.profileService.updatePassword(args)
    if (updatedProfile.isLeft()) {
      const { code, status, message } = updatedProfile.error
      throw new HttpException({ message, code }, status)
    }

    return { updatedProfile: updatedProfile.value }
  }
}
