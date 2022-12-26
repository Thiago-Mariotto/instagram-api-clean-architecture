import { Request, Response } from 'express';
import CreateUser from '../../application/use_cases/CreateUser';
import GetUsers from '../../application/use_cases/GetUsers';
import SavePhotography from '../../application/use_cases/SavePhotography';
import Photography from '../../domain/entity/Photography';
import User from '../../domain/entity/User';
import PhotoRepository from '../../domain/repository/PhotographyRepository';
import UserRepository from '../../domain/repository/UserRepository';
import FileHandler from '../implementations/FileHandler';
import S3Storage from '../implementations/S3Storage';

export default class UserController {
  private createUser: CreateUser;
  private getUsers: GetUsers;
  private s3Storage: S3Storage;
  private savePhotography: SavePhotography;
  private fileHandler: FileHandler;

  constructor(
    readonly userRepository: UserRepository,
    readonly photoRepository: PhotoRepository
  ) {
    this.createUser = new CreateUser(userRepository);
    this.getUsers = new GetUsers(userRepository);
    this.savePhotography = new SavePhotography(photoRepository);
    this.fileHandler = new FileHandler();
    this.s3Storage = new S3Storage();
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.getUsers.execute();
      return res.status(200).json(users);
    } catch (error: any) {
      console.log(`Error on getting users ${error.message}`);
      return res.status(400).json({ message: error.message || 'Unexpected error' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const input = req.body;
    const user = new User(input.username, input.email, input.password);
    try {
      await this.createUser.execute(user);
      return res.status(201).json({ message: 'Success' });
    } catch (error: any) {
      console.log(`Error creating user ${error.message}`);
      return res.status(400).json({ message: error.message || 'Unexpected error' });
    }
  }

  public async uploadFile(req: Request, res: Response): Promise<Response> {
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
      console.log(`Error uploading file: ${error.message}`);
      return res.status(400).json({ message: error.message || 'Unexpected error' });
    }
  }
}