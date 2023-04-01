import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import RefreshMapper from './refresh.mapper'
import { RefreshSchema } from './refresh.model'
import RefreshRepo from './refresh.repository'
import RefreshService from './refresh.services'

const refreshModel = MongooseModule.forFeature([{ schema: RefreshSchema, name: Models.refreshes }])

@Module({
  imports: [refreshModel],
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
