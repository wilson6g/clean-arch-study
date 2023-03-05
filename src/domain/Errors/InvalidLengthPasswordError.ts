import { IDomainError } from "./IDomainError";

export class InvalidLengthPasswordError extends Error implements IDomainError {
  constructor() {
    super('O tamanho minímo da senha são de 7 caracteres.');
    this.name = "InvalidLengthPasswordError";
  }
}