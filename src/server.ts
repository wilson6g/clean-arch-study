import dotenv from 'dotenv';
import { RoleController } from './controller/RoleController';
import { PgPromiseAdapter } from './infra/framework-drivers/database/PgPromiseAdapter/PgPromiseAdapter';
import { FastifyAdapter } from './infra/framework-drivers/HttpClient/FastifyAdapter/FastifyAdapter';
import { RoleRepository } from './infra/repositories/RoleRepository/RoleRepository';
import { CreateRoleUseCase } from './useCases/Role/CreateRole/CreateRoleUseCase';
import { DeleteRoleUseCase } from './useCases/Role/DeleteRole/DeleteRoleUseCase';
import { FindRoleUseCase } from './useCases/Role/FindRoleUseCase/FindRoleUseCase';
import { GetAllRoleUseCase } from './useCases/Role/GetAllRole/GetAllRoleUseCase';

dotenv.config();

const httpServer = new FastifyAdapter();
const database = new PgPromiseAdapter();
const roleRepository = new RoleRepository(database)
export const createRoleUseCase = new CreateRoleUseCase(roleRepository);
export const getAllRoleUseCase = new GetAllRoleUseCase(roleRepository);
export const deleteRoleUseCase = new DeleteRoleUseCase(roleRepository);
export const findRoleUseCase = new FindRoleUseCase(roleRepository);
new RoleController(httpServer, createRoleUseCase, getAllRoleUseCase, deleteRoleUseCase, findRoleUseCase);

httpServer.listen(3000);