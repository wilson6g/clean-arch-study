import { IDomainError } from "./IDomainError";

export class InvalidNameError extends Error implements IDomainError {
  constructor(name: string) {
    super(`O nome ${name} é inválido.`);
    this.name = "InvalidNameError";
  }
}