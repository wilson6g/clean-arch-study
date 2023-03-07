import { IHttpClient } from "../infra/framework-drivers/HttpClient/IHttpClient";
import { RegisterUserResponse } from "../useCases/User/CreateUser/CreateUserResponse";
import { CreateUserUseCase } from "../useCases/User/CreateUser/CreateUserUseCase";
import { DeleteUserUseCase } from "../useCases/User/DeleteUser/DeleteUserUseCase";
import { FindUserUseCase } from "../useCases/User/FindUser/FindUserUseCase";
import { GetAllUserUseCase } from "../useCases/User/GetAllUser/GetAllUserUseCase";
import { MissingParamError } from "./Errors";
import { badRequest, created, deleted, ok, serverError } from "./HttpHelpers/HttpHelpers";

export class UserController {

  constructor(readonly httpServer: IHttpClient,
    readonly createUserUseCase: CreateUserUseCase,
    readonly getAllUserUseCase: GetAllUserUseCase,
    readonly deleteUserUseCase: DeleteUserUseCase,
    readonly findUserUseCase: FindUserUseCase) {

    this.httpServer.register("get", "/user", async (params: any, body: any) => {
      try {
        const output = await this.getAllUserUseCase.execute();

        return ok(output);
      } catch (error) {
        return serverError('internal')
      }
    });

    this.httpServer.register("get", "/user/:id", async (params: any, body: any) => {
      try {
        const output = await this.findUserUseCase.execute(params.id);

        return ok(output);
      } catch (error) {
        return serverError('internal')
      }
    });

    this.httpServer.register("post", "/user", async (params: any, body: any) => {
      try {
        if (!body.name || !body.email || !body.password) {
          const field = !body.name ? 'name' : 'email'
          return badRequest(new MissingParamError(field))
        }

        const userData = {
          name: body.name,
          email: body.email,
          password: body.password
        };

        const registerUserResponse: RegisterUserResponse = await this.createUserUseCase.execute(userData);

        if (registerUserResponse.isLeft()) {
          return badRequest(registerUserResponse.value)
        }

        return created(userData);
      } catch (error) {
        return serverError('internal')
      }
    });

    this.httpServer.register("delete", "/user/:id", async (params: any, body: any) => {
      try {
        await this.deleteUserUseCase.execute(params.id);

        return deleted();
      } catch (error) {
        return serverError('internal')
      }
    });
  }
}