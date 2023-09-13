import { CreateParameterReqBody } from "./create-parameter-req-body";
import { HttpResponseError } from "../../../../utils/http-response-error";

export function checkIfIsValidCreateParameterReqBody(
  body: CreateParameterReqBody
) {
  if (!body?.value.length)
    throw new HttpResponseError(400, "BAD_REQUEST", 'No "value" defined');

  if (!body?.description.length)
    throw new HttpResponseError(400, "BAD_REQUEST", 'No "description" defined');

  if (!body?.parameterkey.length)
    throw new HttpResponseError(
      400,
      "BAD_REQUEST",
      'No "parameterkey" defined'
    );
}
