import { UserRecord } from "firebase-admin/lib/auth";
import * as admin from "firebase-admin";
import { HttpResponseError } from "../utils/http-response-error";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";

class AccountsService {
  async createAccount(
    name: string,
    email: string,
    password: string
  ): Promise<UserRecord> {
    let createUserRes: UserRecord;
    try {
      createUserRes = await admin.auth().createUser({
        displayName: name,
        email: email,
        password: password,
      });
    } catch (e) {
      switch (e.code) {
        case "auth/email-already-exists":
          throw new HttpResponseError(
            400,
            "EXISTING_EMAIL",
            "Email is already in use"
          );
      }
      throw e;
    }
    return admin.auth().getUser(createUserRes.uid);
  }

  async signInWithEmailPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    let signInUserRes: UserCredential;
    const auth = getAuth();
    try {
      signInUserRes = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      throw e;
    }
    return signInUserRes;
  }

  async signOut(): Promise<boolean> {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        throw error;
      });
    return true;
  }
}

export const accountsService: AccountsService = new AccountsService();
