import { NextFunction, Request, Response } from 'express';
import CreateUser from '../../application/use_cases/CreateUser';
import SavePhotography from '../../application/use_cases/SavePhotography';
import Photography from '../../domain/entity/Photography';
import PhotoRepository from '../../domain/repository/PhotographyRepository';
import UserRepository from '../../domain/repository/UserRepository';
import FileHandler from '../implementations/FileHandler';
import S3Storage from '../implementations/S3Storage';

export default class UserController {
  private createUser: CreateUser;
  private s3Storage: S3Storage;
  private savePhotography: SavePhotography;
  private fileHandler: FileHandler;

  constructor(
    readonly userRepository: UserRepository,
    readonly photoRepository: PhotoRepository
  ) {
    this.createUser = new CreateUser(userRepository);
    this.savePhotography = new SavePhotography(photoRepository);
    this.fileHandler = new FileHandler();
    this.s3Storage = new S3Storage();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;
    try {
      await this.createUser.execute({ username, email, password });
      return res.status(201).json({ message: 'Success' });
    } catch (error: any) {
      next(error);
    }
  }

  public async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const { tmpFileName, tmpFilePath } = req.body;
      const ownerId = req.params.id;
      await this.s3Storage.saveFile(tmpFilePath, tmpFileName);
      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${tmpFileName}`;
      const photo = new Photography(ownerId, fileUrl);
      this.savePhotography.execute(photo);
      this.fileHandler.removeUploadedFile(tmpFilePath);
      return res.status(201).json({ message: 'Success' });
    } catch (error: any) {
      next(error);
    }
  }
}