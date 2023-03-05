import { InvalidEmailError } from "../../../domain/Errors/InvalidEmailError";
import { InvalidLengthPasswordError } from "../../../domain/Errors/InvalidLengthPasswordError";
import { InvalidNameError } from "../../../domain/Errors/InvalidNameError";
import { InvalidPasswordHashError } from "../../../domain/Errors/InvalidPasswordHashError";
import { UserAlreadyExistsError } from "../../../domain/Errors/UserAlreadyExistsError";
import { InputUserDTO } from "../../../domain/User/User";
import { Either } from "../../../shared/Either/Either";


export type RegisterUserResponse = Either<InvalidNameError | UserAlreadyExistsError | InvalidPasswordHashError | InvalidEmailError | InvalidLengthPasswordError, InputUserDTO>