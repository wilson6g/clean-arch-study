import { Role } from "../../domain/Role/Role";
import { IRepository } from "../../infra/repositories/IRepository";

export class GetAllRoleUseCase {

  constructor(private readonly repository: IRepository<Role>) {}

  async execute() {
    return this.repository.findAll();
  }

}