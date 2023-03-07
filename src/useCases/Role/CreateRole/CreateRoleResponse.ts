import { InvalidNameError } from "../../../domain/Errors/InvalidNameError";
import { InputRoleDTO } from "../../../domain/Role/Role";
import { Either } from "../../../shared/Either/Either";


export type RegisterRoleResponse = Either<InvalidNameError, InputRoleDTO>