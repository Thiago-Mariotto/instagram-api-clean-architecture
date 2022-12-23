import CreateUser from '../../application/use_cases/CreateUser';
import GetUsers from '../../application/use_cases/GetUsers';
import HttpServer from '../http/HttpServer';

export default class UserController {
  constructor(
    readonly httpServer: HttpServer,
    readonly createUser: CreateUser,
    readonly getUsers: GetUsers
  ) {
    httpServer.on('post', '/user', async function (_params: any, body: any) {
      const input = {
        username: body.username,
        email: body.email,
        password: body.password
      };
      await createUser.execute(input);
    });

    httpServer.on('get', '/user', async function (_params: any, _body: any) {
      const users = await getUsers.execute();
      return users;
    });
  }
}