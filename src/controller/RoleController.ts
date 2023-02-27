import { Role } from "../domain/Role/Role";
import { IHttpClient } from "../infra/framework-drivers/HttpClient/IHttpClient";
import { CreateRoleUseCase } from "../useCases/CreateRole/CreateRoleUseCase";
import { GetAllRoleUseCase } from "../useCases/GetAllRole/GetAllRoleUseCase";

export class RoleController {

  constructor(readonly httpServer: IHttpClient,
    readonly createRoleUseCase: CreateRoleUseCase,
    readonly getAllRoleUseCase: GetAllRoleUseCase) {
    this.httpServer.register("get", "/role", (params: any, body: any) => {
      const output = this.getAllRoleUseCase.execute();

      return output;
    }, 200)

    this.httpServer.register("post", "/role", (params: any, body: any) => {
      const role = new Role({
        name: body.name,
        description: body.description
      })

      const output = this.createRoleUseCase.execute(role);

      return output;
    }, 201)
  }

}