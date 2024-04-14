import puppeteer, { Page } from 'puppeteer';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';
config();

const logger = new Logger();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));
  await app.listen(process.env.PORT || 3000);
  logger.log(`server started on port ` + process.env.PORT || 3000);
}
bootstrap();
