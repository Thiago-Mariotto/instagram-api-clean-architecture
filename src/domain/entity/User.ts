import joi from 'joi';
import HashPassword from './HashPassword';
import Identifier from './Identifier';

export default class User {
  readonly identifier: string;

  private username: string;
  private email: string;
  private password: string;
  private hashPassword: HashPassword;
  private MIN_PASSWORD_LENGTH = 6;
  private MAX_PASSWORD_LENGTH = 24;

  constructor(username: string, email: string, password: string) {
    this.hashPassword = new HashPassword();
    this.identifier = new Identifier().id;
    this.username = username;
    this.email = email;
    this.validateFields(email, password);
    this.password = this.encryptPass(password);
  }

  private validateFields(email: string, password: string) {
    this.passIsValid(password);
    this.emailIsValid(email);
  }

  private passIsValid(password: string) {
    const PWDSCHEMA = joi.string()
      .min(this.MIN_PASSWORD_LENGTH)
      .max(this.MAX_PASSWORD_LENGTH)
      .required();
    const { error } = PWDSCHEMA.validate(password);
    if (error) { throw Error('Invalid password'); }
  }

  private emailIsValid(email: string) {
    const EMAILSCHEMA = joi.string()
      .email()
      .required();
    const { error } = EMAILSCHEMA.validate(email);
    if (error) { throw Error('Invalid email') }
  }

  private encryptPass(password: string) {
    return this.hashPassword.encrypt(password);
  }

  public getUser() {
    return {
      identifier: this.identifier,
      username: this.username,
      email: this.email,
    }
  }
}