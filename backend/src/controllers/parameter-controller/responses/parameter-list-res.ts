import { ParameterRes } from "./parameter-full-res";

export class ParameterListRes {
  constructor(public readonly products: ParameterRes[]) {}
}
