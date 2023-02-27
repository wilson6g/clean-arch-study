import { InputRole, Role } from "../../domain/Role/Role";
import { InMemoryRoleRepository, RoleType } from "../../infra/repositories/RoleRepository/InMemoryRoleRepository/InMemoryRoleRepository";

describe('deve testar role', () => {

  test('deve criar uma role', async () => {
    const roles: RoleType[] = [];

    const inMemoryRoleRepository = new InMemoryRoleRepository(roles);

    const role = new Role({
      id: "18cd08ef-cbc0-4d0b-9066-a721327213b0",
      name: 'PMO',
      description: "Ensina"
    });

    const output = await inMemoryRoleRepository.save(role);

    expect(output.name).toEqual(role.name);
    expect(output.description).toEqual(role.description);
  })

  test('deve buscar um cargo existente', async () => {

    const roles: RoleType[] = [
      {
        id: "86cd08ef-cbc0-4d0b-9066-a721327213b0",
        name: 'Consultor',
        description: "Ensina"
      },
      {
        id: "2ac602a0-c173-4615-9b9c-5a43180a28e1",
        name: 'Administrador',
        description: "Administra"
      },
      {
        id: "6c31a625-7702-4c3c-8615-752f8ccf13ec",
        name: 'Gerente',
        description: "Gerencia"
      }
    ]

    const inMemoryRoleRepository = new InMemoryRoleRepository(roles);

    const output = await inMemoryRoleRepository.find("86cd08ef-cbc0-4d0b-9066-a721327213b0");

    expect(output.id).toEqual("86cd08ef-cbc0-4d0b-9066-a721327213b0");
    expect(output.name).toEqual("Consultor");
    expect(output.description).toEqual("Ensina");
  })

  test('deve retornar todos os cargos', async () => {
    const mock: RoleType[] = [
      {
        id: "86cd08ef-cbc0-4d0b-9066-a721327213b0",
        name: 'Consultor',
        description: "Ensina"
      },
      {
        id: "2ac602a0-c173-4615-9b9c-5a43180a28e1",
        name: 'Administrador',
        description: "Administra"
      },
      {
        id: "6c31a625-7702-4c3c-8615-752f8ccf13ec",
        name: 'Gerente',
        description: "Gerencia"
      }
    ]

    const inMemoryRoleRepository = new InMemoryRoleRepository(mock);

    const output = inMemoryRoleRepository.findAll();

    expect(output.length).toEqual(3);
    expect(output[0]).toEqual({
      id: "86cd08ef-cbc0-4d0b-9066-a721327213b0",
      name: 'Consultor',
      description: "Ensina"
    })
  })

  test('deve retornar que o cargo existe', () => {
    const role = new Role({
      name: 'Consultor',
      description: "Ensina"
    });

    const mock: RoleType[] = [
      {
        id: "86cd08ef-cbc0-4d0b-9066-a721327213b0",
        name: 'Consultor',
        description: "Ensina"
      },
      {
        id: "2ac602a0-c173-4615-9b9c-5a43180a28e1",
        name: 'Administrador',
        description: "Administra"
      },
      {
        id: "6c31a625-7702-4c3c-8615-752f8ccf13ec",
        name: 'Gerente',
        description: "Gerencia"
      }
    ]

    const output = role.roleIsExists(role, mock);

    expect(output).toBe(true);
  })

  test('deve retornar que o cargo não existe', () => {
    const role = new Role({
      name: 'Estagiário',
      description: "Aprende"
    });

    const mock: InputRole[] = [
      {
        id: "123213213",
        name: 'Consultor',
        description: "Ensina"
      },
      {
        id: "123213213",
        name: 'Adminstrador',
        description: "Ensina"
      },
    ]

    const output = role.roleIsExists(role, mock);

    expect(output).toBe(false);
  })
})
