import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { Repos, Services } from 'src/utils/constants'
import CacheModule from '../cache/cache.module'
import { redisModule } from '../redis/module.config'
import { AccessService } from './access.services'
import WhiteListRepo from './white-list.repository'

const jwt = JwtModule.register({})

@Module({
  imports: [jwt, redisModule, CacheModule],
  providers: [
    { provide: Services.access, useClass: AccessService },
    { provide: Repos.whiteList, useClass: WhiteListRepo },
  ],
  exports: [
    { provide: Services.access, useClass: AccessService },
    { provide: Repos.whiteList, useClass: WhiteListRepo },
  ],
})
export default class AccessModule {}
