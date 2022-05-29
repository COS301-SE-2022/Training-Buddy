/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import admin = require("firebase-admin");
const serviceAccount = require("./training-buddy-2022-firebase-adminsdk-uine6-59d810bb2a.json") ;
async function bootstrap() {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://training-buddy-2022-default-rtdb.firebaseio.com"
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
