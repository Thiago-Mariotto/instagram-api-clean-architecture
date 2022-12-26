import User from '../../domain/entity/User';
import UserRepository from '../../domain/repository/UserRepository';

export default class CreateUser {

  constructor(readonly userRepository: UserRepository) { }

  async execute(input: Input) {
    const user = new User(input.username, input.email, input.password);
    this.userRepository.saveUser(user);
  }
}

type Input = {
  username: string;
  email: string;
  password: string;
}