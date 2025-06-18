// import { Module } from '@nestjs/common';
// import { DesFormService } from './des-form.service';
// import { DesFormResolver } from './des-form.resolver';

// @Module({
//   providers: [DesFormResolver, DesFormService],
// })
// export class DesFormModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { DesForm } from './entities/des-form.entity';
import { DesFormResolver } from './des-form.resolver';
import { DesFormService } from './des-form.service';
import { DatabaseModule } from '../../../libs/database/src/database.module';
import { RedisModule } from '../../../libs/redis/src/redis.module';
import { RmqModule } from '../../../libs/rmq/src/rmq.module';


@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    RmqModule,
    TypeOrmModule.forFeature([DesForm]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'apps/des-form/schema.gql'
      },
    }),
  ],
  providers: [DesFormResolver, DesFormService],
  exports: [DesFormService],
})
export class DesFormModule {}