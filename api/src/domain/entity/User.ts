import joi from 'joi';
import Identifier from './Identifier';

export default class User {
  identifier: Identifier;
  username: string;
  email: string;
  password: string;

  constructor(username: string, email: string, password: string) {
    this.identifier = new Identifier();
    this.username = username;
    this.email = email;
    this.passIsValid(password);
    this.password = password;
  }

  private passIsValid(password: string) {
    const PWDSCHEMA = joi.string().min(6).max(16);
    const { error } = PWDSCHEMA.validate(password);
    if (error) throw Error('Invalid password');
  }
}