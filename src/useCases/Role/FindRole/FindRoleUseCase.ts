import { Role } from "../../../domain/Role/Role";
import { IRepository } from "../../../infra/repositories/IRepository";

export class FindRoleUseCase {

  constructor(private readonly repository: IRepository<Role>) {}

  async execute(id: string): Promise<Role> {
    const output = await this.repository.find(id);

    return output;
  }

}