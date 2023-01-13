import { expect } from "chai";
import User from "../../src/domain/entity/User";

describe('User', function () {
  it('É possível registrar um User com sucesso', function () {
    const user = new User('John', 'john@email.com', '123456');
    expect(user).to.be.contains.all.keys(['username', 'email', 'password']);
  });

  it('Deve ser possível recuperar informações de uma pessoa usuária', function () {
    const newUser = new User('John', 'john@email.com', '123456');
    const user = newUser.getUser();
    expect(user).to.be.contains.all.keys(['username', 'email']);
  });

  it('Não é possível registrar um User com password menor de 6 caracteres', function () {
    expect(() => new User('John', 'john@email.com', '123')).to.throw('Invalid password');
  });

  it('Não é possível registrar um User com email inválido', function () {
    expect(() => new User('John', 'john.email.com', '123456')).to.throw('Invalid email');
  });
});
