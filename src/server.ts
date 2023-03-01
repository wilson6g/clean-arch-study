import dotenv from 'dotenv';
import { RoleController } from './controller/RoleController';
import { UserController } from './controller/UserController';
import { PgPromiseAdapter } from './infra/framework-drivers/database/PgPromiseAdapter/PgPromiseAdapter';
import { FastifyAdapter } from './infra/framework-drivers/HttpClient/FastifyAdapter/FastifyAdapter';
import { RoleRepository } from './infra/repositories/RoleRepository/RoleRepository';
import { UserRepository } from './infra/repositories/UserRepository/UserRepository';
import { CreateRoleUseCase } from './useCases/Role/CreateRole/CreateRoleUseCase';
import { DeleteRoleUseCase } from './useCases/Role/DeleteRole/DeleteRoleUseCase';
import { FindRoleUseCase } from './useCases/Role/FindRole/FindRoleUseCase';
import { GetAllRoleUseCase } from './useCases/Role/GetAllRole/GetAllRoleUseCase';
import { CreateUserUseCase } from './useCases/User/CreateUser/CreateUserUseCase';
import { DeleteUserUseCase } from './useCases/User/DeleteUser/DeleteUserUseCase';
import { FindUserUseCase } from './useCases/User/FindUser/FindUserUseCase';
import { GetAllUserUseCase } from './useCases/User/GetAllUser/GetAllUserUseCase';

dotenv.config();

const httpServer = new FastifyAdapter();
const database = new PgPromiseAdapter();
const userRepository = new UserRepository(database);
const roleRepository = new RoleRepository(database)
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUserUseCase = new GetAllUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const findUserUseCase = new FindUserUseCase(userRepository);
const createRoleUseCase = new CreateRoleUseCase(roleRepository);
const getAllRoleUseCase = new GetAllRoleUseCase(roleRepository);
const deleteRoleUseCase = new DeleteRoleUseCase(roleRepository);
const findRoleUseCase = new FindRoleUseCase(roleRepository);
new RoleController(httpServer, createRoleUseCase, getAllRoleUseCase, deleteRoleUseCase, findRoleUseCase);
new UserController(httpServer, createUserUseCase, getAllUserUseCase, deleteUserUseCase, findUserUseCase);

httpServer.listen(3000);