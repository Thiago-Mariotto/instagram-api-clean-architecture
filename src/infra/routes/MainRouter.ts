import { Router } from 'express';
import MySQLPromiseAdapter from '../database/MySQLPromiseAdapter';
import ErrorHandler from '../implementations/ErrorHandler';
import PhotoDatabaseRepository from '../repository/database/PhotoDatabaseRepository';
import UserDatabaseRepository from '../repository/database/UserDatabaseRepository';
import LoginRouter from './LoginRouter';
import UserRouter from './UserRouter';


export default class MainRouter {
  route: Router;
  errorHandler: ErrorHandler;
  constructor() {
    this.route = Router();
    this.errorHandler = new ErrorHandler();
    const connection = new MySQLPromiseAdapter();
    const userRepository = new UserDatabaseRepository(connection);
    const photoRepository = new PhotoDatabaseRepository(connection);
    const userRouter = new UserRouter(userRepository, photoRepository);
    const loginRouter = new LoginRouter(userRepository);
    this.route.use(userRouter.route);
    this.route.use(loginRouter.route);
    this.route.use(this.errorHandler.execute)
  }
}