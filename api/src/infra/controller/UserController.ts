import CreateUser from '../../application/use_cases/CreateUser';
import HttpServer from '../http/HttpServer';

export default class UserController {
  constructor(
    readonly httpServer: HttpServer,
    readonly createUser: CreateUser
  ) {
    httpServer.on('post', '/user', async function (body: any) {
      const input = {
        username: body.username,
        email: body.email,
        password: body.password
      };
      await createUser.execute(input);
    });
  }
}