import AWS, { S3 } from 'aws-sdk';
import dotenv from 'dotenv';
import fs from 'fs/promises';

dotenv.config();
const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'defaultbucket';

export default class S3Storage {
  client: S3;

  constructor() {
    this.client = new AWS.S3({
      region: AWS_REGION
    });
  }

  public async saveFile(path: string, filename: string) {
    const fileContent = await fs.readFile(path);

    this.client.putObject({
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
    }).promise();
  }
}
