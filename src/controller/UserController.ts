import { HttpStatus } from "../commons/HttpStatus/HttpStatus";
import { User } from "../domain/User/User";
import { IHttpClient } from "../infra/framework-drivers/HttpClient/IHttpClient";
import { CreateUserUseCase } from "../useCases/User/CreateUser/CreateUserUseCase";
import { DeleteUserUseCase } from "../useCases/User/DeleteUser/DeleteUserUseCase";
import { FindUserUseCase } from "../useCases/User/FindUser/FindUserUseCase";
import { GetAllUserUseCase } from "../useCases/User/GetAllUser/GetAllUserUseCase";

export class UserController {

  constructor(readonly httpServer: IHttpClient,
    readonly createUserUseCase: CreateUserUseCase,
    readonly getAllUserUseCase: GetAllUserUseCase,
    readonly deleteUserUseCase: DeleteUserUseCase,
    readonly findUserUseCase: FindUserUseCase) {

    this.httpServer.register("get", "/user", (params: any, body: any) => {
      const output = this.getAllUserUseCase.execute();

      return output;
    }, HttpStatus.OK)

    this.httpServer.register("get", "/user/:id", (params: any, body: any) => {
      const output = this.findUserUseCase.execute(params.id);

      return output;
    }, HttpStatus.OK)

    this.httpServer.register("post", "/user", (params: any, body: any) => {
      const user = new User({
        name: body.name,
        email: body.email,
        password: body.password
      })

      const output = this.createUserUseCase.execute(user);

      return output;
    }, HttpStatus.CREATED)

    this.httpServer.register("delete", "/User/:id", (params: any, body: any) => {
      const output = this.deleteUserUseCase.execute(params.id);

      return output;
    }, HttpStatus.NO_CONTENT);
  }
}