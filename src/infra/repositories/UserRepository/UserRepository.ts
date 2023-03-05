import { User } from "../../../domain/User/User";
import { IConnection } from "../../framework-drivers/database/IConnection";
import { IRepository } from "../IRepository";

export class UserRepository implements IRepository<User> {

  constructor(private readonly connection: IConnection) { }

  async save(input: User): Promise<User> {
    const output = await this.connection.query(`INSERT INTO inventorydb.public.user (id, name, email, password) VALUES ('${input.getId}', '${input.getName}', '${input.getEmail}', '${input.getPassword}') RETURNING id, name, email`);

    return output;
  }

  async findAll(): Promise<User[]> {
    const output = await this.connection.query("SELECT * from inventorydb.public.user");

    return output;
  }
  
  async find(id: string): Promise<User> {
    const output = await this.connection.one(`SELECT id, name, email from inventorydb.public.user WHERE id='${id}'`);

    return output;
  }

  async update(id: string, input: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    await this.connection.query(`DELETE FROM inventorydb.public.user WHERE id='${id}'`)
  }
}