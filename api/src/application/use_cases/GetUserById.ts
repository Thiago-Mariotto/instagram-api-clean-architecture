import UserRepository from '../../domain/repository/UserRepository';

export default class GetUserById {
  constructor(readonly userRepository: UserRepository) { }

  async execute(id: string) {
    const user = await this.userRepository.getUserById(id);
    return user;
  }
}