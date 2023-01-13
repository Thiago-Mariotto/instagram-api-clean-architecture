import joi from 'joi';
import HashPassword from './HashPassword';
import Identifier from './Identifier';

export default class User {
  readonly id: string;

  username: string;
  email: string;
  password: string;
  private hashPassword: HashPassword;
  private MIN_PASSWORD_LENGTH = 6;
  private MAX_PASSWORD_LENGTH = 24;

  constructor(username: string, email: string, password: string) {
    this.hashPassword = new HashPassword();
    this.id = new Identifier().id;
    this.passIsValid(password);
    this.username = username;
    this.email = email;
    this.password = this.encryptPass(password);
  }

  private passIsValid(password: string) {
    const PWDSCHEMA = joi.string()
      .min(this.MIN_PASSWORD_LENGTH)
      .max(this.MAX_PASSWORD_LENGTH);
    const { error } = PWDSCHEMA.validate(password);
    if (error) { throw Error('Invalid password'); }
  }

  private encryptPass(password: string) {
    return this.hashPassword.encrypt(password);
  }
}