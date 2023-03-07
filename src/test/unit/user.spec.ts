import { User, InputUser } from "../../domain/User/User";
import { InMemoryUserRepository, UserType } from "../../infra/repositories/UserRepository/InMemoryUserRepository/InMemoryUserRepository";

describe('deve testar user', () => {

  test('deve criar uma user', async () => {
    const users: UserType[] = [];

    const inMemoryUserRepository = new InMemoryUserRepository(users);

    const user = new User({
      id: "18cd08ef-cbc0-4d0b-9066-a721327213b0",
      name: 'Leonam Santos',
      email: 'leleco@gmail.com',
      password: '123456'
    });

    const output = await inMemoryUserRepository.save(user);

    expect(output.name).toEqual(user.name);
    expect(output.email).toEqual(user.email);
  })

  test('deve buscar um user existente', async () => {

    const users: UserType[] = [
      {
        id: "86cd08ef-cbc0-4d0b-9066-a721327213b0",
        name: 'Leonam Santos',
        email: 'leleco@gmail.com',
        password: '123456'
      },
      {
        id: "2ac602a0-c173-4615-9b9c-5a43180a28e1",
        name: 'Alisson Santos',
        email: 'alissonsantos@gmail.com',
        password: '060501'
      },
      {
        id: "6c31a625-7702-4c3c-8615-752f8ccf13ec",
        name: 'Thiago Costa',
        email: 'agothi@gmail.com',
        password: 'agothi123'
      }
    ]

    const inMemoryUserRepository = new InMemoryUserRepository(users);

    const output = await inMemoryUserRepository.find("86cd08ef-cbc0-4d0b-9066-a721327213b0");

    expect(output.id).toEqual("86cd08ef-cbc0-4d0b-9066-a721327213b0");
    expect(output.name).toEqual("Leonam Santos");
    expect(output.email).toEqual("leleco@gmail.com");
  })

  test('deve retornar todos os usuários', async () => {
    const mock: UserType[] = [
      {
        id: "86cd08ef-cbc0-4d0b-9066-a721327213b0",
        name: 'Leonam Santos',
        email: 'leleco@gmail.com',
        password: '123456'
      },
      {
        id: "2ac602a0-c173-4615-9b9c-5a43180a28e1",
        name: 'Alisson Santos',
        email: 'alissonsantos@gmail.com',
        password: '060501'
      },
      {
        id: "6c31a625-7702-4c3c-8615-752f8ccf13ec",
        name: 'Thiago Costa',
        email: 'agothi@gmail.com',
        password: 'agothi123'
      }
    ]

    const inMemoryUserRepository = new InMemoryUserRepository(mock);

    const output = inMemoryUserRepository.findAll();

    expect(output.length).toEqual(3);
    expect(output[0]).toEqual({
      id: "86cd08ef-cbc0-4d0b-9066-a721327213b0",
      name: 'Leonam Santos',
      email: 'leleco@gmail.com',
      password: '123456'
    })
  })

  test('deve retornar que o usuário existe', () => {
    const user = new User({
      name: 'Leonam Santos',
      email: 'leleco@gmail.com',
      password: '123456'
    });

    const mock: UserType[] = [
      {
        id: "86cd08ef-cbc0-4d0b-9066-a721327213b0",
        name: 'Leonam Santos',
        email: 'leleco@gmail.com',
        password: '123456'
      },
      {
        id: "2ac602a0-c173-4615-9b9c-5a43180a28e1",
        name: 'Alisson Santos',
        email: 'alissonsantos@gmail.com',
        password: '060501'
      },
      {
        id: "6c31a625-7702-4c3c-8615-752f8ccf13ec",
        name: 'Thiago Costa',
        email: 'agothi@gmail.com',
        password: 'agothi123'
      }
    ]

    const output = user.userIsExists(user, mock);

    expect(output).toBe(true);
  })

  test('deve retornar que o usuário não existe', () => {
    const user = new User({
      name: 'João Gomes',
      email: 'joaogomes@gmail.com',
      password: '123456'
    });

    const mock: InputUser[] = [
      {
        id: "86cd08ef-cbc0-4d0b-9066-a721327213b0",
        name: 'Leonam Santos',
        email: 'leleco@gmail.com',
        password: '123456'
      },
      {
        id: "2ac602a0-c173-4615-9b9c-5a43180a28e1",
        name: 'Alisson Santos',
        email: 'alissonsantos@gmail.com',
        password: '060501'
      },
      {
        id: "6c31a625-7702-4c3c-8615-752f8ccf13ec",
        name: 'Thiago Costa',
        email: 'agothi@gmail.com',
        password: 'agothi123'
      }
    ]

    const output = user.userIsExists(user, mock);

    expect(output).toBe(false);
  })
})
