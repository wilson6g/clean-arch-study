import { User } from "../../../../domain/User/User";

export type UserType = {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class InMemoryUserRepository {

  private inMemoryDatabase: UserType[] = [];

  constructor(inMemoryDatabase: UserType[]) {
    this.inMemoryDatabase = inMemoryDatabase;
  }

  async save(input: User): Promise<User> {
    const output = await this.findByName(input.id!);

    if (output) {
      throw new Error("Cargo já existe!");
    }

    this.inMemoryDatabase.push(input);

    return input;
  }

  findAll(): UserType[] {
    return this.inMemoryDatabase;
  }

  async find(id: string): Promise<any> {
    const output = this.inMemoryDatabase.find((user) => user.id === id);

    if (!output) {
      return null;
    }

    return output;
  }

  async findByName(name: string): Promise<any> {
    const output = this.inMemoryDatabase.find((user) => user.name === name);

    if (!output) {
      return null;
    }

    return output;
  }
  update(id: string, input: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}