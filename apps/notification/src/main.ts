// import { NestFactory } from '@nestjs/core';
// import { NotificationModule } from './notification.module';

// async function bootstrap() {
//   const app = await NestFactory.create(NotificationModule);
//   await app.listen(process.env.port ?? 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
// import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  
  // // Enable WebSockets
  // app.useWebSocketAdapter(new WsAdapter(app));
  
  // // Connect to RabbitMQ
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.RMQ_URL],
  //     queue: 'notification_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3003);
  Logger.log(`Notification service is running on: ${await app.getUrl()}/graphql`);
}
bootstrap();