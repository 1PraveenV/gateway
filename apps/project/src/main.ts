// import { NestFactory } from '@nestjs/core';
// import { ProjectModule } from './project.module';

// async function bootstrap() {
//   const app = await NestFactory.create(ProjectModule);
//   await app.listen(process.env.port ?? 3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { ProjectModule } from './project.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ProjectModule);
  
  // Connect to RabbitMQ
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.RMQ_URL],
  //     queue: 'project_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen(process.env.PROJECT_SERVICE_PORT || 3001);
  Logger.log(`Project service is running on: ${await app.getUrl()}/graphql`);
}
bootstrap();