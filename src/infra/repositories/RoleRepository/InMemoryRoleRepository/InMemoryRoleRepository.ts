import { Role } from "../../../../domain/Role/Role";

export type RoleType = {
  id: string;
  name: string;
  description: string;
}

export class InMemoryRoleRepository {

  private inMemoryDatabase: RoleType[] = [];

  constructor(inMemoryDatabase: RoleType[]) {
    this.inMemoryDatabase = inMemoryDatabase;
  }

  async save(input: Role): Promise<Role> {
    const output = await this.findByName(input.id);

    if (output) {
      throw new Error("Cargo já existe!");
    }

    this.inMemoryDatabase.push(input);

    return input;
  }

  findAll(): RoleType[] {
    return this.inMemoryDatabase;
  }

  async find(id: string): Promise<any> {
    const output = this.inMemoryDatabase.find((role) => role.id === id);

    if (!output) {
      return null;
    }

    return output;
  }

  async findByName(name: string): Promise<any> {
    const output = this.inMemoryDatabase.find((role) => role.name === name);

    if (!output) {
      return null;
    }

    return output;
  }
  update(id: string, input: Role): Promise<Role> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}