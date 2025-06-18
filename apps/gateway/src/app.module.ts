// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}



import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'project', url: 'http://localhost:3001/graphql' },
            { name: 'auth', url: 'http://localhost:3004/graphql' },
            { name: 'organization', url:'http://localhost:3002/graphql' },
            { name: 'des-form', url: 'http://localhost:3005/graphql' },
            { name: 'notification', url: 'http://localhost:3003/graphql'},
            { name: 'audit', url: 'http://localhost:3006/graphql' },
          ],
        }),
      },
      server: {
        plugins: [],
      },
    }),
  ],
})
export class AppModule {}
