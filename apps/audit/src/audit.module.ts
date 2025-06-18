import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Audit } from './entities/audit.entity';
import { AuditResolver } from './audit.resolver';
import { AuditService } from './audit.service';
import { DatabaseModule } from '../../../libs/database/src/database.module';
import { RedisModule } from '../../../libs/redis/src/redis.module';
import { RmqModule } from '../../../libs/rmq/src/rmq.module';


@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    RmqModule,
    TypeOrmModule.forFeature([Audit]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'apps/audit/schema.gql'
      },
    }),
  ],
  providers: [AuditResolver, AuditService],
  exports: [AuditService],
})
export class AuditModule {}