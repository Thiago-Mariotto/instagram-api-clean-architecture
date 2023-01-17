import { expect } from "chai";
import HashPassword from "../../src/infra/implementations/HashPassword";

const HASH_LENGTH = 60;
const myPassword = '1234567789';

describe('HashPassword entity', function () {
  describe('Casos de sucesso', function () {
    it('Deve criar a hash de uma string', function () {
      const hashedPassword = HashPassword.encrypt(myPassword);
      expect(hashedPassword).to.be.an('string');
      expect(hashedPassword).to.be.length(HASH_LENGTH);
    });

    it('Deve ser possível comparar um password com uma hash com sucesso', function () {
      const encryptedPass = HashPassword.encrypt(myPassword);
      const passIsValid = HashPassword.compare(myPassword, encryptedPass);
      expect(passIsValid).to.be.true;
    });
  });

  describe('Casos de falha', function () {
    it('Não deve ser possível comparar com uma senha diferente da original', function () {
      const fakePassword = '0987654321';
      const encryptedPass = HashPassword.encrypt(myPassword);
      const passIsValid = HashPassword.compare(fakePassword, encryptedPass);
      expect(passIsValid).to.be.false;
    });
  });

});