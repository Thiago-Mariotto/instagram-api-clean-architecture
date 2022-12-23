import dotenv from 'dotenv';
import CreateUser from './application/use_cases/CreateUser';
import GetUsers from './application/use_cases/GetUsers';
import UserController from './infra/controller/UserController';
import ExpressAdapter from './infra/http/ExpressAdapter';
import UserMemoryRepository from './infra/repository/memory/UserMemoryRepository';

dotenv.config();
const PORT = process.env.PORT || 3001;
const userMemoryRepository = new UserMemoryRepository();
const httpServer = new ExpressAdapter();
const createUser = new CreateUser(userMemoryRepository);
const getUsers = new GetUsers(userMemoryRepository);

new UserController(httpServer, createUser, getUsers);
httpServer.listen(PORT as number);