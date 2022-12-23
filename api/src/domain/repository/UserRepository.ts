import User from '../entity/User';

interface UserRepository {
  saveUser(user: User): Promise<void>;
  getUserById(id: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
}

export default UserRepository;