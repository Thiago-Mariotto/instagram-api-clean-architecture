import Identifier from './Identifier';

export default class Photography {
  identifier: Identifier;
  ownerId: string;
  active: boolean;
  url: string;
  createdAt: Date;

  constructor(ownerId: string, url: string) {
    this.identifier = new Identifier();
    this.ownerId = ownerId;
    this.active = true;
    this.url = url;
    this.createdAt = new Date();
  }
}