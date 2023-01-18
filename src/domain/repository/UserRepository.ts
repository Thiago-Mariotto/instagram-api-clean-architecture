import User from '../entity/User';

interface UserRepository {
  saveUser(user: User): Promise<void>;
  getUserById(id: string): Promise<User>;
  updateUser(user: User): Promise<void>;
  removeUser(id: string): Promise<void>;
  getUserByUsername(username: string): Promise<User>;
}

export default UserRepository;