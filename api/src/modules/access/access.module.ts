import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { Repositories, Services } from 'src/utils/constants'
import { redisModule } from '../redis/module.config'
import { AccessService } from './access.services'
import WhiteListRepo from './whiteList.repository'

const jwt = JwtModule.register({})

@Module({
  imports: [jwt, redisModule],
  providers: [
    { provide: Services.access, useClass: AccessService },
    { provide: Repositories.whiteListRepository, useClass: WhiteListRepo },
  ],
  exports: [{ provide: Services.access, useClass: AccessService }],
})
export default class AccessModule {}
