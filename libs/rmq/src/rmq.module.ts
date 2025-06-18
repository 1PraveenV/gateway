// import { Module } from '@nestjs/common';
// import { RmqService } from './rmq.service';

// @Module({
//   providers: [RmqService],
//   exports: [RmqService],
// })
// export class RmqModule {}


import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {RmqService} from './rmq.service'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(), // Make sure ConfigModule is properly imported
    ClientsModule.registerAsync([
      {
        name: 'RMQ_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const rmqUrl = configService.get<string>('RMQ_URL');
          if (!rmqUrl) {
            throw new Error('RMQ_URL environment variable is not defined');
          }

          return {
            transport: Transport.RMQ,
            options: {
              urls: [rmqUrl], // Now definitely a string[]
              queue: 'default_queue',
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
  ],
  providers: [RmqService],
    exports: [RmqService],
  // exports: [ClientsModule],
})
export class RmqModule {}