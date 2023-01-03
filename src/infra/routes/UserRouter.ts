import { NextFunction, Request, Response, Router } from 'express';
import PhotoRepository from '../../domain/repository/PhotographyRepository';
import UserRepository from '../../domain/repository/UserRepository';
import UserController from '../controller/UserController';
import FileHandler from '../implementations/FileHandler';

export default class UserRouter {
  route: Router;
  fileHandler: FileHandler;
  userController: UserController;

  constructor(
    readonly userRepository: UserRepository,
    readonly photoRepository: PhotoRepository
  ) {
    this.route = Router();
    this.fileHandler = new FileHandler();
    this.userController = new UserController(userRepository, photoRepository);

    this.route.post('/user', async (req: Request, res: Response, next: NextFunction) => {
      this.userController.create(req, res, next);
    });

    this.route.post('/user/:id/upload',
      this.fileHandler.upload().single('file'),
      async (req: Request, res: Response, next: NextFunction) => {
        this.userController.uploadFile(req, res, next);
      });
  }
}