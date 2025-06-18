import { NestFactory } from '@nestjs/core';
import { AuditModule } from './audit.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuditModule);
  await app.listen(process.env.port ?? 3006);
  Logger.log(`Audit service is running on: ${await app.getUrl()}/graphql`);
}
bootstrap();
