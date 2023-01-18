import UserRepository from "../../domain/repository/UserRepository";
import Auth from "../../infra/implementations/Auth";
import HashPassword from "../../infra/implementations/HashPassword";

export default class Login {
  private _Auth: Auth;
  constructor(readonly userRepository: UserRepository) {
    this._Auth = new Auth();
  }

  public async execute(input: Input) {
    this.verifyFields(input);
    const user = await this.userRepository.getUserByUsername(input.username);

    if (!user) {
      throw { name: 'NotFound' };
    }
    const passIsValid = HashPassword.compare(input.password, user.password);
    if (!passIsValid) throw { name: 'InvalidCredentials' };

    const userToken = this.generateToken({ identifier: user.identifier, username: user.username });
    return userToken;
  }

  private generateToken(payload: Payload): string {
    return this._Auth.generateToken(payload);
  }

  private verifyFields(input: Input) {
    if (!input.username || !input.password) {
      throw { name: 'BadRequest' };
    }
  }
}

type Input = {
  username: string;
  password: string;
}

type Payload = {
  identifier: string;
  username: string;
}