import { Router } from 'express';
import PhotoMemoryRepository from '../repository/memory/PhotoMemoryRepository';
import UserMemoryRepository from '../repository/memory/UserMemoryRepository';
import UserRouter from './UserRouter';


export default class MainRouter {
  route: Router;

  constructor() {
    this.route = Router();
    const userRepository = new UserMemoryRepository();
    const photoRepository = new PhotoMemoryRepository();
    const userRouter = new UserRouter(userRepository, photoRepository);
    this.route.use(userRouter.route);
  }
}