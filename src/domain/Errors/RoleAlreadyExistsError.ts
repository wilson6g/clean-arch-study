import { IDomainError } from "./IDomainError";

export class RoleAlreadyExistsError extends Error implements IDomainError {
  constructor(name: string) {
    super(`Um cargo com o nome de "${name}", já foi criado.`);
    this.name = "RoleAlreadyExistsError";
  }
}