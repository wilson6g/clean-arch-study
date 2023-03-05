import { IControllerError } from "./IControllerError";

export class ServerError extends Error implements IControllerError {
  constructor(reason: string) {
    super(`Erro no servidor: ${reason}.`);
    this.message = "ServerError";
  }
}