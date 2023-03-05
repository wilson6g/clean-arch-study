import { IDomainError } from "./IDomainError";

export class InvalidEmailError extends Error implements IDomainError {
  constructor(email: string) {
    super(`O e-mail ${email} é invalido.`)
    this.name = "InvalidEmailError";
  }
}