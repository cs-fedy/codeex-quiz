import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common'
import { Request } from 'express'
import { Roles } from 'src/utils/constants'

export const RoleGuard = (...targetRoles: Array<Roles>) => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>()
      const {
        loggedUser: { roles },
      } = request.body

      return (roles as Array<Roles>).some((role) => targetRoles.includes(role))
    }
  }

  return mixin(RoleGuardMixin)
}
