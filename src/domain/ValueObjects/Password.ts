import bcrypt from "bcrypt";
import { Either, left, right } from "../../shared/Either/Either";
import { InvalidLengthPasswordError } from "../Errors/InvalidLengthPasswordError";
import { InvalidPasswordHashError } from "../Errors/InvalidPasswordHashError";

export class Password {
  private readonly password;

  constructor(password: string) {
    this.password = password;
    Object.freeze(this);
  }

  get value(): string {
    return this.password;
  }

  static async create(password: string): Promise<Either<InvalidLengthPasswordError | InvalidPasswordHashError, Password>> {
    if (!Password.validate(password)) {
      return left(new InvalidLengthPasswordError())
    }
    const generatedSalt = await bcrypt.genSalt(10);

    if(!generatedSalt) {
      return left(new InvalidPasswordHashError())
    }

    const hash = await bcrypt.hash(password, generatedSalt)

    if(!hash) {
      return left(new InvalidPasswordHashError())
    }

    return right(new Password(hash))
  }

  static async validate(password: string): Promise<boolean> {
    if (!password || password.trim().length < 5 || password.trim().length > 12) {
      return false
    }

    return true
  }
}