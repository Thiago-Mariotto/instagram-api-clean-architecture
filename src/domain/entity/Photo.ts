import Identifier from './Identifier';

export default class Photo {
  readonly identifier: string;
  readonly ownerId: string;
  readonly url: string;
  readonly createdAt: Date;
  private _active: boolean;

  constructor(ownerId: string, url: string) {
    this.identifier = new Identifier().id;
    this.ownerId = ownerId;
    this._active = true;
    this.url = url;
    this.createdAt = new Date();
  }

  public get active() {
    return this._active;
  }

  public set active(value: boolean) {
    this._active = value;
  }

  get getPhoto() {
    return {
      identifier: this.identifier,
      ownerId: this.ownerId,
      url: this.url,
      active: this._active,
      createdAt: this.createdAt
    }
  }
}