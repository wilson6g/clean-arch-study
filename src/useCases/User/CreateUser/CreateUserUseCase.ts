import { User } from "../../../domain/User/User";
import { IRepository } from "../../../infra/repositories/IRepository";

export class CreateUserUseCase {

  constructor(private readonly repository: IRepository<User>) { }

  async execute(input: User): Promise<User> {
    const users = await this.repository.findAll();

    const isExists = input.userIsExists(input, users);

    if (isExists) {
      throw new Error("Usuário já existe.");
    }

    return this.repository.save(input);
  }
}