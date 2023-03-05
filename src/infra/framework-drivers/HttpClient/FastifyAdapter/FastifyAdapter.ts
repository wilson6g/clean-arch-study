import Fastify from 'fastify';
import { IHttpClient } from "../IHttpClient";

export class FastifyAdapter implements IHttpClient {

  private app: any;

  constructor() {
    this.app = Fastify({
      logger: true
    });
  }

  register(method: string, url: string, callback: Function): Promise<void> {
    return this.app[method](url, async function (request: any, reply: any) {
      const output = await callback(request.params, request.body);
      reply.code(output.statusCode).send(output)
    })
  }

  listen(port: number): Promise<void> {
    return this.app.listen({ port: port }, () => {
      console.log(`✔ server is running at port ${port}`)
    })
  }

}