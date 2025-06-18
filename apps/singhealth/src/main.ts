// import { NestFactory } from '@nestjs/core';
// import { SinghealthModule } from './singhealth.module';

// async function bootstrap() {
//   const app = await NestFactory.create(SinghealthModule);
//   await app.listen(process.env.port ?? 3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { SingHealthModule } from './singhealth.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(SingHealthModule);
  
  // Connect to RabbitMQ
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.RMQ_URL],
  //     queue: 'singhealth_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3004);
  Logger.log(`SingHealth service is running on: ${await app.getUrl()}/graphql`);
}
bootstrap();