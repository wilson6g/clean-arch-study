import { Role } from "../../domain/Role/Role";
import { PgPromiseAdapter } from "../../infra/framework-drivers/database/PgPromiseAdapter/PgPromiseAdapter";
import { RoleRepository } from "../../infra/repositories/RoleRepository/RoleRepository";
import { CreateRoleUseCase } from "../../useCases/CreateRole/CreateRoleUseCase";

describe('Deve testar o UseCase de Role', () => {

  test.skip('Deve criar uma role', async () => {
    const database = new PgPromiseAdapter();
    const roleRepository = new RoleRepository(database);
    const createRoleUseCase = new CreateRoleUseCase(roleRepository);

    const role = new Role({
      name: 'Consultor',
      description: "Ensina"
    });


    const output = await createRoleUseCase.execute(role);

    expect(output.name).toEqual("Consultor");
    expect(output.description).toEqual("Ensina");
  })

})