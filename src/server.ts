import dotenv from 'dotenv';
import { RoleController } from './controller/RoleController';
import { PgPromiseAdapter } from './infra/framework-drivers/database/PgPromiseAdapter/PgPromiseAdapter';
import { FastifyAdapter } from './infra/framework-drivers/HttpClient/FastifyAdapter/FastifyAdapter';
import { RoleRepository } from './infra/repositories/RoleRepository/RoleRepository';
import { CreateRoleUseCase } from './useCases/CreateRole/CreateRoleUseCase';
import { GetAllRoleUseCase } from './useCases/GetAllRole/GetAllRoleUseCase';

dotenv.config();

const httpServer = new FastifyAdapter();
const database = new PgPromiseAdapter();
const roleRepository = new RoleRepository(database)
const createRoleUseCase = new CreateRoleUseCase(roleRepository);
const getAllRoleUseCase = new GetAllRoleUseCase(roleRepository);

new RoleController(httpServer, createRoleUseCase, getAllRoleUseCase);

httpServer.listen(3000);