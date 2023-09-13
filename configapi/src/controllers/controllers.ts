import { RootController } from "./root-controller";
import { Controller } from "./index";
import { ConfigController } from "./configs-controller/configs-controller";

export const CONTROLLERS: Array<Controller> = [
  new RootController(),
  new ConfigController(),
];
