import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common'
import { Request } from 'express'

const AccountConfirmedGuard = () => {
  @Injectable()
  class AccountConfirmedGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>()
      const {
        loggedUser: { isConfirmed },
      } = request.body

      return isConfirmed as boolean
    }
  }

  return mixin(AccountConfirmedGuardMixin)
}

export default AccountConfirmedGuard
