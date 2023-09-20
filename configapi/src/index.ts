import express, { Express } from "express";
import { log } from "./utils/logger";
import bodyParser from "body-parser";
import * as admin from "firebase-admin";
import { HttpServer } from "./controllers";
import { CONTROLLERS } from "./controllers/controllers";
import config from "./config";

if (!config?.FIREBASE_ADMIN?.project_id?.length) {
  throw Error(
    'Missing Firebase Admin Credentials.'
  );
}

admin.initializeApp({
  credential: admin.credential.cert(
    config.FIREBASE_ADMIN as any
  ),
  projectId: config.FIREBASE_ADMIN.project_id,
  databaseURL: `https://${
    config.FIREBASE_ADMIN.project_id ?? ""
}.firebaseio.com`,
});

const app: Express = express();
const httpServer = new HttpServer(app);
//const port = process.env.PORT || 3002;
const port = config.PORT || 3002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

CONTROLLERS.forEach((controller) => {
  controller.initialize(httpServer);
});

app.listen(port, () => {
  log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
