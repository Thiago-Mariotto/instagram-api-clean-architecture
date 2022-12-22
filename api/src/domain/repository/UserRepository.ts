import User from '../entity/User';

interface UserRepository {
  saveUser(user: User): Promise<void>;
  getUserById(id: string): Promise<User>;
}

export default UserRepository;