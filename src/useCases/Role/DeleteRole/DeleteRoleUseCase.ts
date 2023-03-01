import { Role } from "../../../domain/Role/Role";
import { IRepository } from "../../../infra/repositories/IRepository";

export class DeleteRoleUseCase {

  constructor(private readonly repository: IRepository<Role>) { }

  async execute(id: string): Promise<void> {
    return await this.repository.delete(id);
  }

}