import User from '../../../domain/entity/User';
import UserRepository from '../../../domain/repository/UserRepository';

export default class UserMemoryRepository implements UserRepository {
  users: User[];
  constructor() {
    this.users = [];
  }
  getUserByEmailOrUsername(email: string, username: string): Promise<User | undefined> {
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

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find(u => u.identifier === id);
  }

  async saveUser(user: User): Promise<void> {
    this.users.push(user);
  }
}