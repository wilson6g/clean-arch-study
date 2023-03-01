import { User } from "../../../domain/User/User";
import { IRepository } from "../../../infra/repositories/IRepository";

export class FindUserUseCase {

  constructor(private readonly repository: IRepository<User>) {}

  async execute(id: string): Promise<User> {
    const output = await this.repository.find(id);

    return output;
  }

}