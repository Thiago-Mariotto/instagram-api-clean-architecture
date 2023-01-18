import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ExpressAdapter from "../../src/infra/http/ExpressAdapter";
chai.use(chaiHttp);

describe('Check Login [POST /login]', function () {
  const httpServer = new ExpressAdapter();
  describe('Casos de sucesso', async function () {
    it('Deve ser possível recuperar o Token após realizar login', async function () {
      const response = await chai.request(httpServer.app)
        .post('/login')
        .send({ username: 'zezinho', password: '123456' });
      expect(response.body).to.contains.keys(['token']);
    });
  });

  describe('Casos de falha', function () {
    it('Não deve ser possível realizar login com password inválido', async function () {
      const response = await chai.request(httpServer.app)
        .post('/login')
        .send({ username: 'zezinho', password: '123456' });
      expect(response.body.message).to.equal('Invalid username or password');
      expect(response.status).to.equal(403);
    });
  });
})