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

  // //WEBHOOKS
  // //create http server and set port
  // const server = express().use(bodyParser.json) ;
  // server.listen(4040, () => console.log('webhook listening')) ;

  // //create endpoint for webhook
  // server.post('/webhook',(req,res) => {
  //   console.log('webhook event received!', req.query, req.body) ;
  //   res.status(200).send('EVENT_RECEIVED') ;
  // })

  // //add support for GET requests to webhook

  // server.get('/webhook',(req,res) => {
  //   const VERIFY_TOKEN = "STRAVA" ;
  //   console.log("get request received") ;
  //   let mode = req.query['hub.mode'];
  //   let token = req.query['hub.verify_token'];
  //   let challenge = req.query['hub.challenge'];

  //   if(mode && token){
  //     if(mode === 'subscribe' && token === VERIFY_TOKEN){
  //       console.log('WEBHOOK_VERIFIED') ;
  //       res.json({"hub.challenge":challenge}) ;
  //     }else {
  //       res.sendStatus(403) ;
  //     }
  //   }
  // })
}

bootstrap();
