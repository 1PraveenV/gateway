// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class RedisService {}


// import { Injectable, Inject } from '@nestjs/common';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';

// @Injectable()
// export class RedisService {
//   constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

//   async get<T>(key: string): Promise<T | undefined> {
//     return await this.cacheManager.get<T>(key) ?? undefined;
//   }

//   async set(key: string, value: any, ttl?: number): Promise<void> {
//     await this.cacheManager.set(key, value, ttl);
//   }

//   async del(key: string): Promise<void> {
//     await this.cacheManager.del(key);
//   }

//   // async clear(): Promise<void> {
//   //   await this.cacheManager.reset();
//   // }

//   async wrap<T>(
//     key: string,
//     fn: () => Promise<T>,
//     ttl?: number,
//   ): Promise<T> {
//     return this.cacheManager.wrap(key, fn, ttl);
//   }
// }

// redis.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return (await this.cacheManager.get<T>(key)) ?? undefined;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    // Note: For newer versions of cache-manager, the ttl should be in milliseconds
    await this.cacheManager.set(key, value, ttl ? ttl * 1000 : undefined);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async wrap<T>(
    key: string,
    fn: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    return this.cacheManager.wrap(key, fn, ttl ? ttl * 1000 : undefined);
  }

  // async reset(): Promise<void> {
  //   await this.cacheManager.reset();
  // }

  // async keys(pattern?: string): Promise<string[]> {
  //   return this.cacheManager.store.keys?.(pattern) ?? [];
  // }
}