import fs from 'fs';
import multer from 'multer';
import path from 'path';

export default class FileHandler {
  private storage: any;

  constructor() {
    this.checkFolderExists();
  }

  private checkFolderExists() {
    const checkDirectory = path.resolve('tmp', 'uploads');
    if (!fs.existsSync(checkDirectory)) {
      console.log('creating uploads temp directory');
      fs.mkdirSync(checkDirectory, { recursive: true });
    }
  }

  public upload() {
    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.resolve('tmp', 'uploads'));
      },
      filename: function (req, file, cb) {
        const uniqueSufix = `${Date.now()}`;
        const tmpFileName = `${uniqueSufix}-${file.originalname}`;
        cb(null, tmpFileName);
        req.body.tmpFileName = tmpFileName;
        req.body.tmpFilePath = path.resolve('tmp', 'uploads', tmpFileName);
      }
    });
    return multer({ storage: this.storage });
  }

  public removeUploadedFile(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) throw new Error('failed to remove uploaded file');
    });
  }
}