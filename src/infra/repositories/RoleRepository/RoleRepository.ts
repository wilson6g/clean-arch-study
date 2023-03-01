import { Role } from "../../../domain/Role/Role";
import { IConnection } from "../../framework-drivers/database/IConnection";
import { IRepository } from "../IRepository";

export class RoleRepository implements IRepository<Role> {

  constructor(private readonly connection: IConnection) { }

  async save(input: Role): Promise<Role> {
    const output = await this.connection.query(`INSERT INTO inventory.public.role (id, name, description) VALUES ('${input.id}', '${input.name}', '${input.description}') RETURNING *`);

    return output;
  }
  async findAll(): Promise<Role[]> {
    const output = await this.connection.query("SELECT * FROM role");

    return output;
  }
  async find(id: string): Promise<Role> {
    const output = await this.connection.one(`SELECT * FROM role WHERE id = $1`, id);

    return output;
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