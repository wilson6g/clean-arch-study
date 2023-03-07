import crypto from 'crypto';
import { Either, left, right } from '../../shared/Either/Either';
import { InvalidDescriptionError, InvalidNameError, RoleAlreadyExistsError } from '../Errors';
import { Description, Name } from '../ValueObjects';

export type InputRole = {
  id?: string;
  name: Name;
  description: Description;
}

export type InputRoleDTO = {
  id?: string;
  name: string;
  description: string;
}

export class Role {

  private readonly id: string;
  private readonly name: Name;
  private readonly description: Description;

  constructor(props: InputRole) {
    this.id = props.id ?? crypto.randomUUID();
    this.name = props.name;
    this.description = props.description;
    Object.freeze(this);
  }

  public get getId(): string {
    return this.id;
  }

  public get getName(): string {
    return this.name.value;
  }

  public get getDescription(): string {
    return this.description.value;
  }

  static create(input: InputRoleDTO): Either<InvalidNameError, Role> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(input.name);
    const descriptionOrError: Either<InvalidDescriptionError, Description> = Description.create(input.description);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value);
    }

    const name: Name = nameOrError.value;
    const description: Description = descriptionOrError.value;

    return right(new Role({
      id: crypto.randomUUID(),
      name,
      description
    }))
  }

  roleIsExists(input: Role, roles: Role[]): Either<RoleAlreadyExistsError, boolean> {
    const role = roles.find((role) => role.name.toString() === input.name.value);

    if (role) {
      return left(new RoleAlreadyExistsError(input.name.value));
    }

    return right(true);
  }

}