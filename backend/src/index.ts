import express, { Express } from "express";
import { interceptors } from "./interceptors";
import { log } from "./utils/logger";
import bodyParser from "body-parser";
import * as admin from "firebase-admin";
import { environment } from "./environment/environment";
import { HttpServer } from "./controllers";
import { CONTROLLERS } from "./controllers/controllers";
import { initializeApp } from "firebase/app";
import cors from "cors";

if (!environment?.firebaseadmin?.credentials?.project_id?.length) {
  throw Error(
    'Missing Firebase Admin Credentials. Please, check the "Getting Started" section'
  );
}
if (!environment?.firebase?.credentials?.projectId?.length) {
  throw Error(
    'Missing Firebase Credentials. Please, check the "Getting Started" section'
  );
}

//user
initializeApp(environment?.firebase.credentials);
//admin
admin.initializeApp({
  credential: admin.credential.cert(
    environment.firebaseadmin.credentials as any
  ),
  projectId: environment.firebaseadmin.credentials.project_id,
  databaseURL: environment.firebaseadmin.databaseURL,
});

const app: Express = express();
const httpServer = new HttpServer(app);
//const port = process.env.PORT || 3000;
const port = environment?.PORT || 3002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: "https://reactfrontend-7wpxaylhhq-uc.a.run.app" }));

for (let i = 0; i < interceptors.length; i++) {
  app.use(interceptors[i]);
}

CONTROLLERS.forEach((controller) => {
  controller.initialize(httpServer);
});

app.listen(port, () => {
  log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
