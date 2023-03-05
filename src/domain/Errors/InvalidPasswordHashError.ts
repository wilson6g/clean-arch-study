import { IDomainError } from "./IDomainError";

export class InvalidPasswordHashError extends Error implements IDomainError {
  constructor() {
    super("Erro ao encriptar a sua senha.");
    this.message = "InvalidPasswordHashError";
  }
}