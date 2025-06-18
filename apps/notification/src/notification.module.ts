import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Notification } from './entities/notification.entity';
import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';
import { DatabaseModule } from '../../../libs/database/src/database.module';
import { RedisModule } from '../../../libs/redis/src/redis.module';
import { RmqModule } from '../../../libs/rmq/src/rmq.module';

@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    RmqModule,
    TypeOrmModule.forFeature([Notification]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'apps/notification/schema.gql'
      },
      // subscriptions: {
        // 'graphql-ws': true,
      // },
    }),
  ],
  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}