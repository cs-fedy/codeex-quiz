import { Inject, Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'
import { IORedisKey } from '../redis/redis.module'
import ICacheRepo from './ICache.repository'

@Injectable()
export default class CacheRepo<T extends string | number | Buffer> implements ICacheRepo<T> {
  constructor(@Inject(IORedisKey) private readonly redisClient: Redis) {}

  async push(key: string, value: T): Promise<void> {
    await this.redisClient.lpush(key, value)
  }

  async remove(key: string, element: T): Promise<void> {
    await this.redisClient.lrem(key, 1, element)
  }

  async list(key: string): Promise<Array<T>> {
    const items = await this.redisClient.lrange(key, 0, -1)
    return items.map((item) => item as T)
  }

  async search(key: string, element: T): Promise<number> {
    const existingItemIndex = await this.redisClient.lpos(key, element)
    return existingItemIndex === null ? -1 : existingItemIndex
  }

  async clear(key: string): Promise<void> {
    await this.redisClient.del(key)
  }
}
