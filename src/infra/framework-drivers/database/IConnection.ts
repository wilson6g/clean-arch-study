export interface IConnection {
  query(statement: string, params?: string): Promise<any>;
  close(): Promise<void>;
}