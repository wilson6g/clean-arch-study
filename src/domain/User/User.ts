import crypto from 'crypto';
import { Either, left, right } from '../../shared/Either/Either';
import { InvalidEmailError, InvalidLengthPasswordError, InvalidNameError, InvalidPasswordHashError, UserAlreadyExistsError } from '../Errors';
import { Email, Name, Password } from '../ValueObjects';

export type InputUser = {
  id?: string;
  name: Name;
  email: Email;
  password: Password;
}

export type InputUserDTO = {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class User {

  public readonly id: string;
  public readonly name: Name;
  public readonly email: Email;
  public readonly password: Password;

  constructor(props: InputUser) {
    this.id = props.id ?? crypto.randomUUID();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    Object.freeze(this);
  }

  public get getId(): string {
    return this.id;
  }

  public get getName(): string {
    return this.name.value;
  }

  public get getEmail(): string {
    return this.email.value;
  }

  public get getPassword(): string {
    return this.password.value;
  }

  static async create(input: InputUserDTO): Promise<Either<InvalidNameError | InvalidPasswordHashError | InvalidEmailError | InvalidLengthPasswordError, User>> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(input.name);
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(input.email);
    const passwordOrError: Either<InvalidLengthPasswordError | InvalidPasswordHashError, Password> = await Password.create(input.password);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }
    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }
    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const name: Name = nameOrError.value
    const email: Email = emailOrError.value
    const password: Password = passwordOrError.value;

    return right(new User({
      id: crypto.randomUUID(),
      name,
      email,
      password
    }));
  }

  userIsExists(input: User, users: User[]): Either<UserAlreadyExistsError, boolean> {
    const user = users.find((user) => user.email.toString() === input.email.value);

    if (user) {
      return left(new UserAlreadyExistsError(input.email.value));
    }

    return right(true);
  }

}