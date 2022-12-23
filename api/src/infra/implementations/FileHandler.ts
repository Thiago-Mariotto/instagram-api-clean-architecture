import fs from 'fs';
import multer from 'multer';
import path from 'path';

export default class FileHandler {
  private storage: any;

  constructor() {
    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.resolve('tmp', 'uploads'));
      },
      filename: function (req, file, cb) {
        const uniqueSufix = `${Date.now()}`;
        const tmpFileName = `${uniqueSufix}-${file.originalname}`;
        cb(null, tmpFileName);
      }
    });
  }

  public upload() {
    this.checkFolderExists();
    return multer({ storage: this.storage });
  }

  private checkFolderExists() {
    console.log('creating directory');
    const checkDirectory = path.resolve('tmp', 'uploads');
    if (!fs.existsSync(checkDirectory)) {
      fs.mkdirSync(checkDirectory, { recursive: true });
    }
  }
}