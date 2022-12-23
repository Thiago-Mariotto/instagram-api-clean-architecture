import UserRepository from '../../domain/repository/UserRepository';

export default class GetUsers {

  constructor(readonly userRepository: UserRepository) { }

  async execute() {
    return this.userRepository.getUsers();
  }
}