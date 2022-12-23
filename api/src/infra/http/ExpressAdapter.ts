/* eslint-disable @typescript-eslint/ban-types */
import express from 'express';
import Router from '../routes/MainRouter';
export default class ExpressAdapter {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    const router = new Router();
    this.app.use(router.route);
  }

  listen(port: number): void {
    console.log(`app listening on port ${port}`);
    this.app.listen(port);
  }
}