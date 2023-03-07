import { Role } from "../../../domain/Role/Role";
import { IConnection } from "../../framework-drivers/database/IConnection";
import { IRepository } from "../IRepository";

export class RoleRepository implements IRepository<Role> {

  constructor(private readonly connection: IConnection) { }

  async save(input: Role): Promise<Role> {
    const output = await this.connection.query(`INSERT INTO inventorydb.public.role (id, name, description) VALUES ('${input.getId}', '${input.getName}', '${input.getDescription}') RETURNING *`);

    return output;
  }

  async findAll(): Promise<Role[]> {
    const output = await this.connection.query("SELECT * FROM inventorydb.public.role");

    return output;
  }

  async find(id: string): Promise<Role> {
    const output = await this.connection.one(`SELECT * FROM inventorydb.public.role WHERE id = $1`, id);

    return output;
  }

  async update(id: string, input: Role): Promise<Role> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    return await this.connection.query(`DELETE from role WHERE id=${id}`);
  }

  async deleteAll(): Promise<void> {
    return await this.connection.query("DELETE * FROM role");
  }
}