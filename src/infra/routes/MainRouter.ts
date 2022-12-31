import { Router } from 'express';
import MySQLPromiseAdapter from '../database/MySQLPromiseAdapter';
import PhotoDatabaseRepository from '../repository/database/PhotoDatabaseRepository';
import UserDatabaseRepository from '../repository/database/UserDatabaseRepository';
import UserRouter from './UserRouter';


export default class MainRouter {
  route: Router;

  constructor() {
    this.route = Router();
    const connection = new MySQLPromiseAdapter();
    const userRepository = new UserDatabaseRepository(connection);
    const photoRepository = new PhotoDatabaseRepository(connection);
    const userRouter = new UserRouter(userRepository, photoRepository);
    this.route.use(userRouter.route);
  }
}