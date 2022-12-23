import { Router } from 'express';
import UserMemoryRepository from '../repository/memory/UserMemoryRepository';
import UserRouter from './UserRouter';


export default class MainRouter {
  route: Router;

  constructor() {
    this.route = Router();
    const userRepository = new UserMemoryRepository();
    const userRouter = new UserRouter(userRepository);
    this.route.use(userRouter.route);
  }
}


