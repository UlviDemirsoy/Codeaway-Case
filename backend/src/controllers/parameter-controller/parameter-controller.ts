import { Controller, HttpServer } from "../index";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ParameterEntity } from "../../entities/parameter-entity";
import { CreateParameterReqBody } from "../parameter-controller/requests/create-parameter/create-parameter-req-body";
import { parametersRepository } from "../../repository/parameters-repository";
import { HttpResponseError } from "../../utils/http-response-error";
import { checkIfIsValidCreateParameterReqBody } from "../parameter-controller/requests/create-parameter/create-parameter-validation";
import { ParameterRes } from "./responses/parameter-full-res";
import { ParameterListRes } from "./responses/parameter-list-res";
import { UpdateParameterReqBody } from "./requests/update-parameter/update-parameter-req-body";

export class ParameterController implements Controller {
  initialize(httpServer: HttpServer): void {
    httpServer.post("/parameter", this.createParameter.bind(this));
    httpServer.get("/parameterlist", this.getParameterListPublic.bind(this));
    httpServer.get("/parameter/:parameterId", this.getParameterById.bind(this));
    httpServer.put("/parameter/:parameterId", this.updateParameter.bind(this));
    httpServer.delete(
      "/parameter/:parameterId",
      this.deleteParameterById.bind(this)
    );
  }

  private readonly createParameter: RequestHandler = async (req, res, next) => {
    const reqBody: CreateParameterReqBody = Object.assign({}, req.body);

    checkIfIsValidCreateParameterReqBody(reqBody);

    const parameter = await parametersRepository.createParameterById(
      reqBody.parameterkey,
      reqBody.value,
      reqBody.description
    );
    res.send(new ParameterRes(parameter, ""));
    next();
  };

  private readonly getParameterListPublic: RequestHandler = async (
    req,
    res,
    next
  ) => {
    const parameters = await parametersRepository.getParameters();
    res.send(parameters);
    next();
  };

  private readonly getParameterById: RequestHandler = async (
    req,
    res,
    next
  ) => {
    const product = await parametersRepository.getParameterById(
      req.params["parameterId"]
    );
    res.send(product);
    next();
  };

  private readonly deleteParameterById: RequestHandler = async (
    req,
    res,
    next
  ) => {
    const isdeleted = await parametersRepository.deleteParameterById(
      req.params["parameterId"]
    );
    res.send(isdeleted);
    next();
  };

  private readonly updateParameter: RequestHandler = async (req, res, next) => {
    const reqBody: UpdateParameterReqBody = Object.assign({}, req.body);
    checkIfIsValidCreateParameterReqBody(reqBody);
    const parameter = await parametersRepository.updateParameterById(
      req.params["parameterId"],
      reqBody.parameterkey,
      reqBody.value,

      reqBody.description
    );
    res.send(new ParameterRes(parameter, req.params["parameterId"]));
    next();
  };
}
