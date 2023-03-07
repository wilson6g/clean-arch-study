import { Either, left, right } from "../../shared/Either/Either";
import { InvalidDescriptionError } from "../Errors";

export class Description {
  private readonly description;

  constructor(description: string) {
    this.description = description;
    Object.freeze(description);
  }

  get value(): string {
    return this.description;
  }

  static create(description: string): Either<InvalidDescriptionError, Description> {
    if (!Description.validate(description)) {
      return left(new InvalidDescriptionError());
    }
    return right(new Description(description))
  }

  static validate(description: string): boolean {
    const lengthSize = description.length;

    if (!lengthSize) {
      return false;
    }

    if (lengthSize < 5 || lengthSize > 20) {
      return false;
    }

    return true;
  }
}