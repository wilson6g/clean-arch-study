export interface IHttpClient {
  register(method: string, url: string, callback: Function, statusCode: number): Promise<void>
  listen(port: number): Promise<void>
}