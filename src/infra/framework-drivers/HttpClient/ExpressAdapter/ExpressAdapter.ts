import express from "express";
import { IHttpClient } from "../IHttpClient";

export class ExpressAdapter implements IHttpClient {

  private app: any;

  constructor() {
    this.app = express();
  }

  async register(method: string, url: string, callback: Function) {
    this.app[method](url, async function (request: any, response: any) {
      const output = await callback(request.params, request.body);
      response.json(output);
    })
  }

  async listen(port: number) {
    this.app.listen(port, () => {
      console.log(`✔ server is running at port ${port}`)
    })
  }
}