import { NestFactory } from '@nestjs/core';
import { DesFormModule } from './des-form.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(DesFormModule);
  
  // // Connect to RabbitMQ
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.RMQ_URL],
  //     queue: 'des_form_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3005);
  Logger.log(`DES Form service is running on: ${await app.getUrl()}/graphql`);
}
bootstrap();