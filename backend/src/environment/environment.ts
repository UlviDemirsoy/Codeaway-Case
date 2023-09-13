import * as firebaseCredentials from "./firebase-credentials.json";
import * as firebaseCredentialsUser from "./firebase-crendentials-user.json";

export const environment = {
  firebaseadmin: {
    databaseURL: `https://${
      firebaseCredentials?.project_id ?? ""
    }.firebaseio.com`,
    credentials: firebaseCredentials,
  },
  firebase: {
    databaseURL: `https://${
      firebaseCredentialsUser?.storageBucket ?? ""
    }.firebaseio.com`,
    credentials: firebaseCredentialsUser,
  },
  PORT: 8080,
};
