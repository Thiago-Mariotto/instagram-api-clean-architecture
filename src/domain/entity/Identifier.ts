import { v4 as uuid } from 'uuid';

export default class Identifier {
  readonly id: string;

  constructor() {
    this.id = uuid();
  }
}