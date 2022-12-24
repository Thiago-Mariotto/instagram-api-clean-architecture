import { NextFunction, Request, Response, Router } from 'express';
import Photography from '../../domain/entity/Photography';
import S3Storage from '../../domain/entity/S3Storage';
import User from '../../domain/entity/User';
import PhotoRepository from '../../domain/repository/PhotoRepository';
import UserRepository from '../../domain/repository/UserRepository';
import FileHandler from '../implementations/FileHandler';

export default class UserRouter {
  route: Router;
  fileHandler: any;

  constructor(readonly userRepository: UserRepository, readonly photoRepository: PhotoRepository) {
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

    this.route.post('/user/:id/upload', this.fileHandler.upload().single('file'), async (req: Request, res: Response, _next: NextFunction) => {
      const { tmpFileName, tmpFilePath } = req.body;
      const ownerId = req.params.id;

      const s3Storage = new S3Storage();
      await s3Storage.saveFile(tmpFilePath, tmpFileName);

      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${tmpFileName}`;
      const photo = new Photography(ownerId, fileUrl);
      photoRepository.save(photo);
      this.fileHandler.removeUploadedFile(tmpFilePath);
      return res.status(201).send('ok');
    });
  }
}