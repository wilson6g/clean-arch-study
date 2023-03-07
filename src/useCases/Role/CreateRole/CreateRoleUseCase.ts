import { InvalidNameError } from "../../../domain/Errors/InvalidNameError";
import { InputRoleDTO, Role } from "../../../domain/Role/Role";
import { IRepository } from "../../../infra/repositories/IRepository";
import { Either, left, right } from "../../../shared/Either/Either";
import { RegisterRoleResponse } from "./CreateRoleResponse";

export class CreateRoleUseCase {

  constructor(private readonly repository: IRepository<Role>) { }

  async execute(input: InputRoleDTO): Promise<RegisterRoleResponse> {
    const roleOrError: Either<InvalidNameError, Role> = Role.create(input);

    if (roleOrError.isLeft()) {
      return left(roleOrError.value);
    }

    const role: Role = roleOrError.value
    const roles = await this.repository.findAll();

    const isExists = role.roleIsExists(role, roles);

    if (isExists.isLeft()) {
      return left(isExists.value);
    }

    await this.repository.save(role);

    return right(input);
  }
}