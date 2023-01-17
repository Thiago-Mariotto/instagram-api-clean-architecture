import { expect } from "chai";
import User from "../../src/domain/entity/User";

describe('User entity', function () {

  describe('Casos de sucesso', function () {
    it('É possível registrar um User com sucesso', function () {
      const user = new User('Johne', 'john@email.com', '123456');
      expect(user).to.be.instanceof(User);
    });

    it('Deve ser possível recuperar informações de uma pessoa usuária', function () {
      const newUser = new User('John', 'john@email.com', '123456');
      const user = newUser.getUser();
      expect(user).to.be.contains.all.keys(['identifier', 'username', 'email']);
    });

    it('Deve ser possível recupear o username', function () {
      const user = new User('John', 'john@email.com', '123456');
      expect(user.username).to.be.an('string');
      expect(user.username).to.be.equal('John');
    });

    it('Deve ser possível alterar o username', function () {
      const user = new User('John', 'john@email.com', '123456');
      user.username = 'Johnatas';
      expect(user.username).to.be.equal('Johnatas');
    });

    it('Deve ser possível recupear o email', function () {
      const user = new User('John', 'john@email.com', '123456');
      expect(user.email).to.be.an('string');
      expect(user.email).to.be.equal('john@email.com');
    });

    it('Deve ser possível alterar o email', function () {
      const user = new User('John', 'john@email.com', '123456');
      user.email = 'johnjohn@email.com';
      expect(user.email).to.be.equal('johnjohn@email.com');
    });
  });

  describe('Casos de falha', function () {
    it('Não é possível registrar um User com password menor de 6 caracteres', function () {
      expect(() => new User('John', 'john@email.com', '123')).to.throw('Invalid password');
    });

    it('Não é possível registrar um User com password maior de 24 caracteres', function () {
      expect(() => new User('John', 'john@email.com', '123456789123456789123456789')).to.throw('Invalid password');
    });

    it('Não é possível registrar um User com email inválido', function () {
      expect(() => new User('John', 'john.email.com', '123456')).to.throw('Invalid email');
    });

    it('Não é possível registrar um User com username inválido', function () {
      expect(() => new User('a', 'john@email.com', '123456')).to.throw('Invalid username');
    });

    it('Não é possível alterar o email com um email inválido', function () {
      const user = new User('John', 'john@email.com', '123456');
      expect(() => user.email = 'johnjohn.email.com').to.throw('Invalid email');
    });

    it('Não é possível alterar o username com um username inválido', function () {
      const user = new User('John', 'john@email.com', '123456');
      expect(() => user.username = 'Jo').to.throw('Invalid username');
    });
  });
}); 
