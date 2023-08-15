import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: '*',
  });
  const staticPath = join(process.cwd(), 'uploads');
  app.use(express.static(staticPath));
  await app.listen(3307);
}
bootstrap();