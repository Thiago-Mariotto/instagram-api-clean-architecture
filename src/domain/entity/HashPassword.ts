import crypto from 'crypto-js';

export default class HashPassword {
  private secretWord: string;

  constructor() {
    this.secretWord = process.env.SECRET_WORD || 'secret';
  }

  encrypt(userPassword: string): string {
    return crypto.AES.encrypt(userPassword, this.secretWord,).toString();
  }

  decrypt(userPassword: string): string {
    return crypto.AES.decrypt(userPassword, this.secretWord).toString();
  }
}