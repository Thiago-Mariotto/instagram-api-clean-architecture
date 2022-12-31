import User from '../../../domain/entity/User';
import UserRepository from '../../../domain/repository/UserRepository';
import Connection from '../../database/Connection';

export default class UserDatabaseRepository implements UserRepository {

  constructor(readonly connection: Connection) { }
  updateUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  removeUser(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async saveUser(user: User): Promise<void> {
    return await this.connection.query('INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
      [user.id, user.username, user.email, user.password]);
  }
  async getUserById(id: string): Promise<User | undefined> {
    return await this.connection.query('SELECT * FROM users WHERE id = ?', [id]);
  }
}