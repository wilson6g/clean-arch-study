import axios from "axios";
import { IHttpRequest } from "../IHttpRequest";

export class AxiosAdapter implements IHttpRequest {

  private app: any

  constructor(baseURL: string, headers?: object) {
    this.app = axios.create({
      baseURL,
      headers
    })
  }

  async get(uri: string, params?: string): Promise<any> {
    if (params) {
      const output = await this.app.get(`${uri}/${params}`);
      return output.data;
    }

    const output = await this.app.get(`${uri}`);

    return output.data;
  }

  async post(uri: string, body: any): Promise<any> {
    const output = await this.app.post(`${uri}`, body);

    return output.data;
  }

  async delete(uri: string, params: string): Promise<any> {
    const output = await this.app.delete(`${uri}/${params}`);

    return output.data;
  }

}