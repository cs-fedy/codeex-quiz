import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Mappers, Models, Repositories, Services } from 'src/utils/constants'
import RefreshMapper from './refresh.mapper'
import { RefreshSchema } from './refresh.model'
import RefreshRepo from './refresh.repository'
import RefreshService from './refresh.services'

const refreshModel = MongooseModule.forFeature([{ schema: RefreshSchema, name: Models.refresh }])

@Module({
  imports: [refreshModel],
  providers: [
    { provide: Mappers.refresh, useClass: RefreshMapper },
    { provide: Repositories.refresh, useClass: RefreshRepo },
    { provide: Services.refresh, useClass: RefreshService },
  ],
  exports: [
    { provide: Repositories.refresh, useClass: RefreshRepo },
    { provide: Services.refresh, useClass: RefreshService },
  ],
})
export default class RefreshModule {}
