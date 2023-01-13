import Identifier from './Identifier';

export default class Photo {
  identifier: string;
  ownerId: string;
  active: boolean;
  url: string;
  createdAt: Date;

  constructor(ownerId: string, url: string) {
    this.identifier = new Identifier().id;
    this.ownerId = ownerId;
    this.active = true;
    this.url = url;
    this.createdAt = new Date();
  }
}