import { Injectable, Inject, CACHE_MANAGER } from "@nestjs/common"
import type { Cache } from "cache-manager"

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string): Promise<any> {
    return await this.cacheManager.get(key)
  }

  async set(key: string, value: any, ttl: number): Promise<void> {
    await this.cacheManager.set(key, value, { ttl })
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key)
  }
}

