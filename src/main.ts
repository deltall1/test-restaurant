require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { serverConfig } from './configs/server.config';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const { port, stage } = serverConfig;

  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(port);
  logger.log(`App ${stage} is now listening on port ${port}`);
}
bootstrap();
