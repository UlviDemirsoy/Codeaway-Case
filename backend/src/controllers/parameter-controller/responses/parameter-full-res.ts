import { firestore } from "firebase-admin";
import Timestamp = firestore.Timestamp;
import { ParameterEntity } from "../../../entities/parameter-entity";

export class ParameterRes {
  public readonly Id: string;
  public readonly parameterkey: string;
  public readonly value: string;
  public readonly description: string;
  public readonly createdate: Timestamp;
  constructor(data: ParameterEntity, id: string) {
    this.Id = id;
    this.createdate = data.createdate;
    this.description = data.description;
    this.parameterkey = data.parameterkey;
    this.value = data.value;
  }

  static empty() {
    return new ParameterRes(
      new ParameterEntity("", "", "", Timestamp.now()),
      ""
    );
  }
}
