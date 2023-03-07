import { IDomainError } from "./IDomainError";

export class InvalidDescriptionError extends Error implements IDomainError {
  constructor() {
    super(`A quantidade de caracteres da descrição é superior a 20.`);
    this.name = "InvalidDescriptionError";
  } 
  
}