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
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

async function bootstrap() {
  const serviceAccount = require('./training-buddy-2022-firebase-adminsdk-uine6-59d810bb2a.json')
  const express = require('express') ;
  const bodyParser = require('body-parser') ;

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:process.env.PROJECT_ID,
      privateKey: process.env.PRIVATE_KEY,
      clientEmail: process.env.CLIENT_MAIL
      
    }),
    databaseURL: process.env.DATABASE_URL,
  });

  const app = await NestFactory.create(AppModule); 
  //const app = express().use(bodyParser.json) ;
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
