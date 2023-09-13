import { Controller, HttpServer } from "../index";
import { RequestHandler } from "express";

import { configsRepository } from "../../repository/configs-repository";

export class ConfigController implements Controller {
  initialize(httpServer: HttpServer): void {
    httpServer.get("/config", this.getAppConfig.bind(this));
  }

  //keyvalue basılcak sadece jsona
  private readonly getAppConfig: RequestHandler = async (req, res, next) => {
    const config = await configsRepository.getAppConfig();
    res.json(config);
    next();
  };
}
