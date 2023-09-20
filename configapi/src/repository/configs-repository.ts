import { ParameterEntity } from "../entities/parameter-entity";
import { db } from "./db";
import { serializeFS } from "../utils/serialize-firestore";
import { firestore } from "firebase-admin";
import FieldValue = firestore.FieldValue;
import Timestamp = firestore.Timestamp;

export class ConfigsRepository {
  async getAppConfig(): Promise<JSON> {
    const snapshot = await db().collection("parameters").get();
    const tempDoc: JSON = <JSON>(<unknown>{});
    snapshot.docs.forEach((element) => {
      var key = element.data().parameterkey;
      var value = element.data().value;
      tempDoc[key] = value;
    });
    return tempDoc;
  }
}

export const configsRepository = new ConfigsRepository();
