import { Module } from '@nestjs/common'
import { Repos } from 'src/utils/constants'
import { redisModule } from '../redis/module.config'
import CacheRepo from './cache.repository'

@Module({
  imports: [redisModule],
  providers: [{ provide: Repos.cache, useClass: CacheRepo }],
  exports: [{ provide: Repos.cache, useClass: CacheRepo }],
})
export default class CacheModule {}
