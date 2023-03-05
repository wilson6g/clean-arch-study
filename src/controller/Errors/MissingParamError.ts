import { IControllerError } from "./IControllerError";

export class MissingParamError extends Error implements IControllerError {
  constructor(paramName: string) {
    super(`O campo ${paramName} não encontrado`);
    this.name = "MissingParamError";
  }
}