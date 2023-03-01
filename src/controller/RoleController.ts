import { HttpStatus } from "../commons/HttpStatus/HttpStatus";
import { Role } from "../domain/Role/Role";
import { IHttpClient } from "../infra/framework-drivers/HttpClient/IHttpClient";
import { CreateRoleUseCase } from "../useCases/Role/CreateRole/CreateRoleUseCase";
import { DeleteRoleUseCase } from "../useCases/Role/DeleteRole/DeleteRoleUseCase";
import { FindRoleUseCase } from "../useCases/Role/FindRoleUseCase/FindRoleUseCase";
import { GetAllRoleUseCase } from "../useCases/Role/GetAllRole/GetAllRoleUseCase";

export class RoleController {

  constructor(readonly httpServer: IHttpClient,
    readonly createRoleUseCase: CreateRoleUseCase,
    readonly getAllRoleUseCase: GetAllRoleUseCase,
    readonly deleteRoleUseCase: DeleteRoleUseCase,
    readonly findRoleUseCase: FindRoleUseCase) {

    this.httpServer.register("get", "/role", (params: any, body: any) => {
      const output = this.getAllRoleUseCase.execute();

      return output;
    }, HttpStatus.OK)

    this.httpServer.register("get", "/role/:id", (params: any, body: any) => {
      console.log(params);
      const output = this.findRoleUseCase.execute(params.id);

      return output;
    }, HttpStatus.OK)

    this.httpServer.register("post", "/role", (params: any, body: any) => {
      const role = new Role({
        name: body.name,
        description: body.description
      })

      const output = this.createRoleUseCase.execute(role);

      return output;
    }, HttpStatus.CREATED)

    this.httpServer.register("delete", "/role/:id", (params: any, body: any) => {
      const output = this.deleteRoleUseCase.execute(params.id);

      return output;
    }, HttpStatus.NO_CONTENT);
  }
}