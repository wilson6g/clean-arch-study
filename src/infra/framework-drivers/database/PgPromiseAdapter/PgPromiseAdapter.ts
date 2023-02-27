import pgp from "pg-promise";
import { IConnection } from "../IConnection";

export class PgPromiseAdapter implements IConnection {

  private app: any

  constructor() {
    this.app = pgp()("postgres://postgres:password@localhost:5432/inventory");
  }

  async query(statement: string, params?: string): Promise<any> {
    return await this.app.query(statement, params);
  }

  async close(): Promise<void> {
    return await this.app.close();
  }
}