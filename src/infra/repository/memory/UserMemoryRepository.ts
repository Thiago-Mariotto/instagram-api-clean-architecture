import User from '../../../domain/entity/User';
import UserRepository from '../../../domain/repository/UserRepository';

export default class UserMemoryRepository implements UserRepository {
  users: User[];
  constructor() {
    this.users = [];
  }
  getUserByUsername(username: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  updateUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  removeUser(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getUsers(): Promise<User[]> {
    return this.users;
  }
  async getUserById(id: string): Promise<User> {
    const user = this.users.find(u => u.identifier === id);
    return user as User;
  }
  async saveUser(user: User): Promise<void> {
    this.users.push(user);
  }
}