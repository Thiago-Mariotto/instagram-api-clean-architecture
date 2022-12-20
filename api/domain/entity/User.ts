import uuid from 'uuid';

export default class User {
  id: string;
  username: string;
  email: string;
  password: string;

  constructor(username: string, email: string, password: string) {
    this.id = uuid.v4();
    this.username = username;
    this.email = email;
    this.password = password;
  }
}