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
const serviceAccount = require('./training-buddy-2022-firebase-adminsdk-uine6-59d810bb2a.json')
const server: express.Express = express();
export const createNestServer = async (expressInstance: express.Express) => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
  });
  const adapter = new ExpressAdapter(expressInstance);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, adapter, {},
  );
  app.enableCors();
  return app.init();
};
createNestServer(server)
  .then(v => console.log('Nest Ready'))
  .catch(err => console.error('Nest broken', err));
export const api: functions.HttpsFunction = functions.https.onRequest(server);
async function bootstrap() {
 


  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  const webhookServer = express() ;

  // Sets server port and logs message on success
  webhookServer.listen(process.env.PORT || 3000, () => console.log('webhook is listening'));

  // Creates the endpoint for our webhook
  webhookServer.post('/webhook', (req, res) => {
    console.log("webhook event received!", req.query, req.body);
    res.status(200).send('EVENT_RECEIVED');
  });

  // Adds support for GET requests to our webhook
  webhookServer.get('/webhook', (req, res) => {
    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = "STRAVA";
    // Parses the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Verifies that the mode and token sent are valid
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {     
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.json({"hub.challenge":challenge});  
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  });
}

bootstrap();
