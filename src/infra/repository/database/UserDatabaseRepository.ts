import User from '../../../domain/entity/User';
import UserRepository from '../../../domain/repository/UserRepository';
import Connection from '../../database/Connection';

export default class UserDatabaseRepository implements UserRepository {

  constructor(readonly connection: Connection) { }
  async getUserByUsername(username: string): Promise<User> {
    const [result] = await this.connection.query('SELECT * FROM users WHERE username = ?',
      [username]);
    return result[0];
  }
  updateUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  removeUser(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async saveUser(user: User): Promise<void> {
    return await this.connection.query('INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
      [user.identifier, user.username, user.email, user.password]);
  }
  async getUserById(id: string): Promise<User> {
    const [result] = await this.connection.query('SELECT * FROM users WHERE id = ?', [id]);
    return result[0];
  }
}