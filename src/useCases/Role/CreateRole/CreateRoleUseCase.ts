import { InputRole, Role } from "../../../domain/Role/Role";
import { IRepository } from "../../../infra/repositories/IRepository";

export class CreateRoleUseCase {

  constructor(private readonly repository: IRepository<Role>) { }

  async execute(input: Role): Promise<Role> {
    const roles = await this.repository.findAll();

    const isExists = input.roleIsExists(input, roles);

    if (isExists) {
      throw new Error("Cargo já existe.");
    }

    return this.repository.save(input);
  }
}