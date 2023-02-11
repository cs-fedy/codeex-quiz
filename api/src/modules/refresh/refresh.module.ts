import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Mappers, Models, Repositories } from 'src/utils/constants'
import RefreshMapper from './refresh.mapper'
import { RefreshSchema } from './refresh.model'
import RefreshRepo from './refresh.repository'

const refreshModel = MongooseModule.forFeature([{ schema: RefreshSchema, name: Models.refresh }])

@Module({
  imports: [refreshModel],
  providers: [
    { provide: Mappers.refreshMapper, useClass: RefreshMapper },
    { provide: Repositories.refreshRepository, useClass: RefreshRepo },
  ],
  exports: [{ provide: Repositories.refreshRepository, useClass: RefreshRepo }],
})
export default class RefreshModule {}
