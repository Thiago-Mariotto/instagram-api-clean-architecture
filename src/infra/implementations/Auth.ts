import jwt from "jsonwebtoken";

export default class Auth {
  private _SECRET_KEY: string;
  constructor() {
    this._SECRET_KEY = process.env.SECRET_KEY || 'secret';
  }

  public generateToken(payload: Payload): string {
    const options = {
      expiresIn: '24h'
    }
    return jwt.sign(payload, this._SECRET_KEY, options);
  }

  public async tokenIsValid(token: string) {
    try {
      return jwt.verify(token, this._SECRET_KEY)
    } catch (err: any) {
      throw new Error('Error signing token');
    }
  }
}

type Payload = {
  identifier: string;
  username: string;
}