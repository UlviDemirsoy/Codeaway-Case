import { ParameterEntity } from "../entities/parameter-entity";
import { db } from "./db";
import { serializeFS } from "../utils/serialize-firestore";
import { firestore } from "firebase-admin";
import FieldValue = firestore.FieldValue;
import Timestamp = firestore.Timestamp;

export class ConfigsRepository {
  async getAppConfig(): Promise<JSON[]> {
    const snapshot = await db().collection("parameters").get();

    var arr: any[] = [];
    snapshot.docs.forEach((element) => {
      var key = element.data().parameterkey;
      var value = element.data().value;
      var tempDoc = {};
      tempDoc[key] = value;
      arr.push(tempDoc);
    });
    return arr;
  }
}

export const configsRepository = new ConfigsRepository();
