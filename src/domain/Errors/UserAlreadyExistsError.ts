import { IDomainError } from "./IDomainError";

export class UserAlreadyExistsError extends Error implements IDomainError {
  constructor(email: string) {
    super(`Um usuário com e-mail "${email}", já existe.`);
    this.name = "UserAlreadyExistsError";
  }
}