export interface IHttpRequest {
  get(uri: string, params?: string): Promise<any>
  post(uri: string, body: any): Promise<any>
  delete(uri: string, params: string): Promise<any>
}