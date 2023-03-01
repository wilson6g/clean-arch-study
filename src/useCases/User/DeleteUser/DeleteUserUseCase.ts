import { User } from "../../../domain/User/User";
import { IRepository } from "../../../infra/repositories/IRepository";

export class DeleteUserUseCase {

  constructor(private readonly repository: IRepository<User>) { }

  async execute(id: string): Promise<void> {
    return await this.repository.delete(id);
  }

}