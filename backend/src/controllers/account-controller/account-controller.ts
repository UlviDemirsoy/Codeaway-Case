import { Controller, HttpServer } from "../index";
import { RequestHandler } from "express";
import { CreateAccountReqBody } from "./requests/create-account/create-account-req-body";
import { CreateAccountResBody } from "./responses/create-account-res-body";
import { checkIfIsValidCreateAccountReqBody } from "./requests/create-account/create-account-validation";
import { accountsService } from "../../services/accounts-service";
import { LoginAccountReqBody } from "./requests/login-account/login-account-req-body";

export class AccountController implements Controller {
  initialize(httpServer: HttpServer): void {
    httpServer.post("/account", this.createAccount.bind(this));
    httpServer.post("/account/login", this.signInEmailPassword.bind(this));
  }

  private readonly createAccount: RequestHandler = async (req, res, next) => {
    const body: CreateAccountReqBody = Object.assign({}, req.body);
    checkIfIsValidCreateAccountReqBody(body);
    const refreshedUser = await accountsService.createAccount(
      body.name,
      body.email,
      body.password
    );
    res.send(new CreateAccountResBody(refreshedUser));
    next();
  };

  private readonly signInEmailPassword: RequestHandler = async (
    req,
    res,
    next
  ) => {
    const body: LoginAccountReqBody = Object.assign({}, req.body);
    var signIn = await accountsService.signInWithEmailPassword(
      body.email,
      body.password
    );
    //topken falan setlenecek burada response bodye cevirilebilir data
    res.send(signIn);
    next();
  };
}
