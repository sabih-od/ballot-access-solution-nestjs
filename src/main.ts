import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import * as fs from "fs";
import * as path from 'path';

const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '', '/ssl/key.txt').replace('dist', '')),
    cert: fs.readFileSync(path.join(__dirname, '', '/ssl/cert.txt').replace('dist', '')),
};

async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: '*',
  });
  const staticPath = join(process.cwd(), 'uploads');
  app.use(express.static(staticPath));
  await app.listen(3307);
}
bootstrap();