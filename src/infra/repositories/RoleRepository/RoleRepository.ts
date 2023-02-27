import { Role } from "../../../domain/Role/Role";
import { IConnection } from "../../framework-drivers/database/IConnection";
import { IRepository } from "../IRepository";

export class RoleRepository implements IRepository<Role> {

  constructor(private readonly connection: IConnection) { }

  async save(input: Role): Promise<Role> {
    return await this.connection.query(`INSERT INTO inventory.public.role (id, name, description) VALUES ('${input.id}', '${input.name}', '${input.description}') RETURNING *`);
  }
  async findAll(): Promise<Role[]> {
    return await this.connection.query("SELECT * FROM role");
  }
  async find(id: string): Promise<Role> {
    return await this.connection.query(`SELECT * FROM role WHERE id = '${id}'`);
  }
  async update(id: string, input: Role): Promise<Role> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async deleteAll(): Promise<void> {
    return await this.connection.query("DELETE * FROM role");
  }
}