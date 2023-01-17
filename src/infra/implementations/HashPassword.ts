import bcrypt from 'bcryptjs';

export default class HashPassword {
  private static _saltRounds = 10;

  public static encrypt(password: string): string {
    const salt = bcrypt.genSaltSync(this._saltRounds);
    return bcrypt.hashSync(password, salt);
  };

  public static compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}