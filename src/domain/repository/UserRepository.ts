import User from '../entity/User';

interface UserRepository {
  saveUser(user: User): Promise<void>;
  getUserById(id: string): Promise<User | undefined>;
  updateUser(user: User): Promise<void>;
  removeUser(id: string): Promise<void>;
}

export default UserRepository;