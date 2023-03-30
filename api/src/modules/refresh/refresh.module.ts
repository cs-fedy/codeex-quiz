import { Module } from '@nestjs/common'
import { Mappers, Repos, Services } from 'src/utils/constants'
import RefreshMapper from './refresh.mapper'
import RefreshRepo from './refresh.repository'
import RefreshService from './refresh.services'

@Module({
  providers: [
    { provide: Mappers.refresh, useClass: RefreshMapper },
    { provide: Repos.refresh, useClass: RefreshRepo },
    { provide: Services.refresh, useClass: RefreshService },
  ],
  exports: [
    { provide: Repos.refresh, useClass: RefreshRepo },
    { provide: Services.refresh, useClass: RefreshService },
  ],
})
export default class RefreshModule {}
