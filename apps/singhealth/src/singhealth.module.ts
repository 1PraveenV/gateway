import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Singhealth } from './entities/singhealth.entity';
import { SinghealthResolver } from './singhealth.resolver';
import { SinghealthService } from './singhealth.service';
import { DatabaseModule } from '../../../libs/database/src/database.module';
import { RedisModule } from '../../../libs/redis/src/redis.module';
import { RmqModule } from '../../../libs/rmq/src/rmq.module';
// import { AuthModule } from './auth/auth.module';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    RmqModule,
    // AuthModule,
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '1h' },
    // }),
    TypeOrmModule.forFeature([Singhealth]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'apps/singhealth/schema.gql'
      },
      context: ({ req }) => ({ req }),
    }),
  ],
  providers: [SinghealthResolver, SinghealthService],
  exports: [SinghealthService],
})
export class SingHealthModule {}