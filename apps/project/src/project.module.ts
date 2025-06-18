// import { Module } from '@nestjs/common';
// import { ProjectService } from './project.service';
// import { ProjectResolver } from './project.resolver';

// @Module({
//   providers: [ProjectResolver, ProjectService],
// })
// export class ProjectModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Project } from './entities/project.entity';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { RedisModule } from '../../../libs/redis/src/redis.module';
import { RmqModule } from '../../../libs/rmq/src/rmq.module';
import { DatabaseModule } from '../../../libs/database/src/database.module';

@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    RmqModule,
    TypeOrmModule.forFeature([Project]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'apps/project/schema.gql'
      },
      buildSchemaOptions: {
        orphanedTypes: [],
      },
    }),
  ],
  providers: [ProjectResolver, ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}