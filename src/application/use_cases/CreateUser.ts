import User from '../../domain/entity/User';
import UserRepository from '../../domain/repository/UserRepository';
import HashPassword from '../../infra/implementations/HashPassword';

export default class CreateUser {

  constructor(readonly userRepository: UserRepository) { }

  async execute(input: Input) {
    const user = new User(input.username, input.email, input.password);
    user.password = HashPassword.encrypt(user.password);
    await this.userRepository.saveUser(user);
  }
}

type Input = {
  username: string;
  email: string;
  password: string;
}