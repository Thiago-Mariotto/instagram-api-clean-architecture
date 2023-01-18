import joi from 'joi';
import Identifier from './Identifier';

export default class User {
  readonly identifier: string;
  private _username: string;
  private _email: string;
  private _password: string;

  private _MIN_PASSWORD_LENGTH = 6;
  private _MAX_PASSWORD_LENGTH = 24;

  constructor(username: string, email: string, password: string) {
    this.validateFields(username, email, password);
    this.identifier = new Identifier().id;
    this._username = username;
    this._email = email;
    this._password = password;
  }

  private validateFields(username: string, email: string, password: string) {
    this.passIsValid(password);
    this.emailIsValid(email);
    this.userNameIsValid(username);
  }

  private passIsValid(password: string) {
    const PWDSCHEMA = joi.string()
      .min(this._MIN_PASSWORD_LENGTH)
      .max(this._MAX_PASSWORD_LENGTH)
      .required();
    const { error } = PWDSCHEMA.validate(password);
    if (error) { throw Error('Invalid password'); }
  }

  private userNameIsValid(username: string) {
    const USERNAMESCHEMA = joi.string()
      .min(4)
      .required();

    const { error } = USERNAMESCHEMA.validate(username);
    if (error) { throw Error('Invalid username') }
  }

  private emailIsValid(email: string) {
    const EMAILSCHEMA = joi.string()
      .email()
      .required();
    const { error } = EMAILSCHEMA.validate(email);
    if (error) { throw Error('Invalid email') }
  }

  public getUser() {
    return {
      identifier: this.identifier,
      username: this._username,
      email: this._email,
    }
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this.emailIsValid(value);
    this._email = value;
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this.userNameIsValid(value);
    this._username = value;
  }

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }
}