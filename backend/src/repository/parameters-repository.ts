import { ParameterEntity } from "../entities/parameter-entity";
import { db } from "./db";
import { serializeFS } from "../utils/serialize-firestore";
import { firestore } from "firebase-admin"; //admin privilages
import FieldValue = firestore.FieldValue;
import Timestamp = firestore.Timestamp;
import { ParameterRes } from "../controllers/parameter-controller/responses/parameter-full-res";
import * as firestoreUser from "firebase/firestore"; //user privilages

export class ParametersRepository {
  async getParameterById(parameterId: string): Promise<ParameterEntity | null> {
    const parameterRes = await db()
      .collection("parameters")
      .doc(parameterId)
      .get();
    if (!parameterRes.exists) {
      return null;
    }
    return Object.assign(ParameterRes.empty(), {
      Id: parameterId,
      createdate: parameterRes.data()!.createdate,
      description: parameterRes.data()!.description,
      parameterkey: parameterRes.data()!.parameterkey,
      value: parameterRes.data()!.value,
    });
  }

  async createParameterById(
    parameterkey: string,
    value: string,
    description: string
  ): Promise<ParameterEntity> {
    const parametersCollection = db().collection("parameters");
    const data = new ParameterEntity(
      parameterkey,
      value,
      description,
      Timestamp.now()
    );
    await parametersCollection.add(serializeFS(data));
    return data;
  }

  async getParameters(): Promise<ParameterRes[]> {
    const snapshot = await db().collection("parameters").get();
    return snapshot.docs.map((doc) =>
      Object.assign(ParameterRes.empty(), {
        Id: doc.id,
        createdate: doc.data().createdate,
        description: doc.data().description,
        parameterkey: doc.data().parameterkey,
        value: doc.data().value,
      })
    );
  }

  async deleteParameterById(
    parameterId: string
  ): Promise<firestoreUser.DocumentReference> {
    const dbase = firestoreUser.getFirestore();
    const docRef = firestoreUser.doc(dbase, "parameters", parameterId);
    //const res = await dbase.collection('cities').doc('DC').delete();
    firestoreUser
      .deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
    return docRef;
  }

  //updatedto gelcek buraya
  async updateParameterById(
    parameterId: string,
    parameterkey: string,
    value: string,
    description: string
  ): Promise<ParameterEntity> {
    //delete düzeltilecek
    const parametersCollection = await db().collection("parameters");
    const ref = parametersCollection.doc(parameterId);
    //değişcek bura
    const data = new ParameterEntity(
      parameterkey,
      value,
      description,
      Timestamp.now()
    );
    await ref.set(serializeFS(data));
    return data;
  }
}

export const parametersRepository = new ParametersRepository();
