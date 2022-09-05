/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as admin from "firebase-admin"
import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,
    method: ["POST", "GET"],            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


const serviceAccount = require('./training-buddy-2022-firebase-adminsdk-uine6-59d810bb2a.json')
const server: express.Express = express();
export const createNestServer = async (expressInstance: express.Express) => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
  });
  const adapter = new ExpressAdapter(expressInstance);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, adapter, {cors:true},
  );
  app.enableCors();
  return app.init();
};

//create endpoint for webhook
  server.post('/webhook',(req,res) => {
    console.log('webhook event received!', req.query, req.body) ;
    res.status(200).send('EVENT_RECEIVED') ;
  })

//add support for GET requests to webhook

server.get('/webhook',(req,res) => {
  const VERIFY_TOKEN = "STRAVA" ;
  console.log("get request received") ;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if(mode && token){
    if(mode === 'subscribe' && token === VERIFY_TOKEN){
      console.log('WEBHOOK_VERIFIED') ;
      res.json({"hub.challenge":challenge}) ;
    }else {
      res.sendStatus(403) ;
    }
  }
});

createNestServer(server)
  .then(v => console.log('Nest Ready'))
  .catch(err => console.error('Nest broken', err));
export const api: functions.HttpsFunction = functions.https.onRequest(server);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'graphql';
  app.setGlobalPrefix(globalPrefix);
  const port =3333;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  // //WEBHOOKS
  // //create http server and set port
  // const server = express().use(bodyParser.json) ;
  // server.listen(4040, () => console.log('webhook listening')) ;
}

bootstrap();
