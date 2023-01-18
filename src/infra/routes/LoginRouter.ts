import { NextFunction, Request, Response, Router } from "express";
import UserRepository from "../../domain/repository/UserRepository";
import LoginController from "../controller/LoginController";

export default class LoginRouter {
  readonly route: Router;
  private _loginController: LoginController;

  constructor(readonly userRepository: UserRepository) {
    this.route = Router();
    this._loginController = new LoginController(userRepository);

    this.route.post('/login', (req: Request, res: Response, next: NextFunction) => {
      this._loginController.handle(req, res, next)
    });
  }
}