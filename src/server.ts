import dotenv from 'dotenv';
import { Role } from './domain/Role/Role';
import { PgPromiseAdapter } from './infra/framework-drivers/database/PgPromiseAdapter/PgPromiseAdapter';
import { ExpressAdapter } from './infra/framework-drivers/HttpClient/ExpressAdapter/ExpressAdapter';
import { RoleRepository } from './infra/repositories/RoleRepository/RoleRepository';
import { CreateRoleUseCase } from './useCases/CreateRole/CreateRoleUseCase';

dotenv.config();

const httpServer = new ExpressAdapter();
const database = new PgPromiseAdapter();
const roleRepository = new RoleRepository(database);
const createRoleUseCase = new CreateRoleUseCase(roleRepository);


(async () => {
  // console.log(await roleRepository.save(role));
  // console.log(await roleRepository.findAll());
  // console.log(await roleRepository.find('dca4224-3160-49f5-ac39-7afb382a393b'))
  // console.log(await createRoleUseCase.execute(role))
})()

httpServer.listen(3000);