import { NestFactory } from '@nestjs/core';
import { OrganizationModule } from './organization.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(OrganizationModule);
  
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.RMQ_URL],
  //     queue: 'organization_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3002);
  Logger.log(`Organization service is running on: ${await app.getUrl()}/graphql`);
}
bootstrap();
