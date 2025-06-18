import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS if needed
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.GATEWAY_PORT || 4000);
  Logger.log(`🚀 Gateway is running on: ${await app.getUrl()}/graphql`);
}
bootstrap();