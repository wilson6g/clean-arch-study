import { IHttpClient } from "../infra/framework-drivers/HttpClient/IHttpClient";
import { RegisterRoleResponse } from "../useCases/Role/CreateRole/CreateRoleResponse";
import { CreateRoleUseCase } from "../useCases/Role/CreateRole/CreateRoleUseCase";
import { DeleteRoleUseCase } from "../useCases/Role/DeleteRole/DeleteRoleUseCase";
import { FindRoleUseCase } from "../useCases/Role/FindRole/FindRoleUseCase";
import { GetAllRoleUseCase } from "../useCases/Role/GetAllRole/GetAllRoleUseCase";
import { MissingParamError } from "./Errors";
import { badRequest, created, deleted, ok, serverError } from "./HttpHelpers/HttpHelpers";

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
        if (!body.name || !body.description) {
          const field = !body.name ? 'name' : 'description'
          return badRequest(new MissingParamError(field))
        }

        const roleData = {
          name: body.name,
          description: body.description,
        };

        const registerRoleResponse: RegisterRoleResponse = await this.createRoleUseCase.execute(roleData);

        if (registerRoleResponse.isLeft()) {
          return badRequest(registerRoleResponse.value)
        }

        return created(roleData);
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