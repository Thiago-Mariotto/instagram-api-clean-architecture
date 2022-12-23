import { NextFunction, Request, Response, Router } from 'express';
import User from '../../domain/entity/User';
import UserRepository from '../../domain/repository/UserRepository';
import FileHandler from '../implementations/FileHandler';

export default class UserRouter {
  route: Router;
  fileHandler: any;

  constructor(readonly userRepository: UserRepository) {
    this.route = Router();
    this.fileHandler = new FileHandler();

    this.route.get('/user', async (req: Request, res: Response, _next: NextFunction) => {
      const users = await this.userRepository.getUsers();
      return res.status(200).json(users);
    });

    this.route.post('/user', async (req: Request, res: Response, _next: NextFunction) => {
      const body = req.body;
      const user = new User(body.username, body.email, body.password);
      this.userRepository.saveUser(user);
      return res.status(201).end();
    });

    this.route.post('/user/:id/upload', this.fileHandler.upload().single('file'), (req: Request, res: Response, _next: NextFunction) => {
      return res.status(201).send('ok');
    });
  }
}