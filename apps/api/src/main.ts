/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as admin from "firebase-admin"
import * as dotenv from "dotenv";
async function bootstrap() {

  admin.initializeApp({
    credential: admin.credential.cert({
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL,
      project_id:process.env.PROJECT_ID
    }as Partial<admin.ServiceAccount>),
    databaseURL: process.env.DATABASE_URL
  });

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
