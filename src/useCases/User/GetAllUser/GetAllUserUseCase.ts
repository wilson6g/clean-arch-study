import { User } from "../../../domain/User/User";
import { IRepository } from "../../../infra/repositories/IRepository";

export class GetAllUserUseCase {

  constructor(private readonly repository: IRepository<User>) { }

  async execute(): Promise<User[]> {
    return this.repository.findAll();
  }

}