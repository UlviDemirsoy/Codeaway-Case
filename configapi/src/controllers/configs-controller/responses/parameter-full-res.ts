import { firestore } from "firebase-admin";
import Timestamp = firestore.Timestamp;
import { ParameterEntity } from "../../../entities/parameter-entity";

export class ParameterRes {
  public readonly parameterkey: string;
  public readonly value: string;
  constructor(data: ParameterEntity) {
    this.parameterkey = data.parameterkey;
    this.value = data.value;
  }

  static empty() {
    return new ParameterRes(new ParameterEntity("", "", "", Timestamp.now()));
  }
}
