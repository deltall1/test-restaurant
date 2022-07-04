require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { serverConfig } from './configs/server.config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const { port, stage } = serverConfig;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log(`App ${stage} is now listening on port ${port}`);
}
bootstrap();
