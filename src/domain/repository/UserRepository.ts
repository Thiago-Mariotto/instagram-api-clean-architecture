import User from '../entity/User';

interface UserRepository {
  saveUser(user: User): Promise<void>;
  getUserById(id: string): Promise<User | undefined>;
  updateUser(user: User): Promise<void>;
  removeUser(id: string): Promise<void>;
  getUserByEmailOrUsername(email: string, username: string): Promise<User | undefined>;
}

export default UserRepository;