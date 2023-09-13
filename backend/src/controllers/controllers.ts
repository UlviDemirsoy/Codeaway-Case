import { RootController } from "./root-controller";
import { AccountController } from "./account-controller/account-controller";
import { Controller } from "./index";
import { ParameterController } from "./parameter-controller/parameter-controller";

export const CONTROLLERS: Array<Controller> = [
  new RootController(),
  new AccountController(),
  new ParameterController(),
];
