import { InvalidEmailError } from "../../../domain/Errors/InvalidEmailError";
import { InvalidLengthPasswordError } from "../../../domain/Errors/InvalidLengthPasswordError";
import { InvalidNameError } from "../../../domain/Errors/InvalidNameError";
import { InvalidPasswordHashError } from "../../../domain/Errors/InvalidPasswordHashError";
import { InputUserDTO, User } from "../../../domain/User/User";
import { IRepository } from "../../../infra/repositories/IRepository";
import { Either, left, right } from "../../../shared/Either/Either";
import { RegisterUserResponse } from "./CreateUserResponse";

export class CreateUserUseCase {

  constructor(private readonly repository: IRepository<User>) { }

  async execute(input: InputUserDTO): Promise<RegisterUserResponse> {
    const userOrError: Either<InvalidNameError | InvalidEmailError | InvalidLengthPasswordError | InvalidPasswordHashError, User> = await User.create(input);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user: User = userOrError.value
    const users = await this.repository.findAll();

    const isExists = user.userIsExists(user, users);

    if (isExists.isLeft()) {
      return left(isExists.value);
    }

    await this.repository.save(user);

    return right(input);
  }
}