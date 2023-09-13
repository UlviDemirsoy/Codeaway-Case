import { firestore } from "firebase-admin";
import Timestamp = firestore.Timestamp;

export class ParameterEntity {
  constructor(
    public readonly parameterkey: string,
    public readonly value: string,
    public readonly description: string,
    public readonly createdate: Timestamp
  ) {}

  static empty() {
    return new ParameterEntity("", "", "", Timestamp.now());
  }
}
