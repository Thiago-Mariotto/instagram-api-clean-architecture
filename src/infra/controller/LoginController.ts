import { NextFunction, Request, Response } from "express";
import Login from "../../application/use_cases/Login";
import UserRepository from "../../domain/repository/UserRepository";

export default class LoginController {
  private _login: Login;

  constructor(readonly userRepository: UserRepository) {
    this._login = new Login(userRepository);
  }

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    try {
      const token = await this._login.execute({ username, password });
      return res.status(200).json({ token });
    } catch (error: any) {
      next(error);
    }
  };
}