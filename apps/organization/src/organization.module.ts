// import { Module } from '@nestjs/common';
// import { OrganizationService } from './organization.service';
// import { OrganizationResolver } from './organization.resolver';

// @Module({
//   providers: [OrganizationResolver, OrganizationService],
// })
// export class OrganizationModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Organization } from './entities/organization.entity';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';
import { DatabaseModule } from '../../../libs/database/src/database.module';
import { RedisModule } from '../../../libs/redis/src/redis.module';
import { RmqModule } from '../../../libs/rmq/src/rmq.module';

@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    RmqModule,
    TypeOrmModule.forFeature([Organization]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'apps/organization/schema.gql'
      },
    }),
  ],
  providers: [OrganizationResolver, OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}