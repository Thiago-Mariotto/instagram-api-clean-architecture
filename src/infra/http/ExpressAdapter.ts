/* eslint-disable @typescript-eslint/ban-types */
import express, { NextFunction, Request, Response } from 'express';
import Router from '../routes/MainRouter';
export default class ExpressAdapter {
  app: any;

  constructor() {
    const router = new Router();

    this.app = express();
    this.app.use(express.json());
    this.app.use(router.route);
    this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      return res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
    });
  }

  listen(port: number): void {
    console.log(`app listening on port ${port}`);
    this.app.listen(port);
  }
}