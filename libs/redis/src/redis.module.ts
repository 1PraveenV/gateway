// import { Module } from '@nestjs/common';
// import { RedisService } from './redis.service';

// @Module({
//   providers: [RedisService],
//   exports: [RedisService],
// })
// export class RedisModule {}

import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        ttl: 60, // default TTL in seconds
        max: 1000, // maximum number of items in cache
      }),
      isGlobal: true,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
  // exports: [CacheModule],
})
export class RedisModule {}