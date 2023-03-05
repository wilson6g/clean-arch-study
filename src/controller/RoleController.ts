import { Role } from "../domain/Role/Role";
import { IHttpClient } from "../infra/framework-drivers/HttpClient/IHttpClient";
import { CreateRoleUseCase } from "../useCases/Role/CreateRole/CreateRoleUseCase";
import { DeleteRoleUseCase } from "../useCases/Role/DeleteRole/DeleteRoleUseCase";
import { FindRoleUseCase } from "../useCases/Role/FindRole/FindRoleUseCase";
import { GetAllRoleUseCase } from "../useCases/Role/GetAllRole/GetAllRoleUseCase";
import { created, deleted, ok, serverError } from "./HttpHelpers/HttpHelpers";

export class RoleController {

  constructor(readonly httpServer: IHttpClient,
    readonly createRoleUseCase: CreateRoleUseCase,
    readonly getAllRoleUseCase: GetAllRoleUseCase,
    readonly deleteRoleUseCase: DeleteRoleUseCase,
    readonly findRoleUseCase: FindRoleUseCase) {

    this.httpServer.register("get", "/role", async (params: any, body: any) => {
      try {
        const output = await this.getAllRoleUseCase.execute();
  
        return ok(output);
      } catch (error) {
        return serverError('internal')
      }
    })

    this.httpServer.register("get", "/role/:id", async (params: any, body: any) => {
      try {
        const output = await this.findRoleUseCase.execute(params.id);
  
        return ok(output);
      } catch (error) {
        return serverError('internal')
      }
    })

    this.httpServer.register("post", "/role", async (params: any, body: any) => {
      try {
        const role = new Role({
          name: body.name,
          description: body.description
        })
  
        const output = await this.createRoleUseCase.execute(role);
        
        return created(output);
      } catch (error) {
        return serverError('internal')
      }
    })

    this.httpServer.register("delete", "/role/:id", async (params: any, body: any) => {
      try {
        await this.deleteRoleUseCase.execute(params.id);
        return deleted();
      } catch (error) {
        return serverError('internal')
      }
    });
  }
}