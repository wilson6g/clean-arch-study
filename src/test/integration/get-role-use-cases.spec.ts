import { AxiosAdapter } from "../../infra/framework-drivers/HttpRequest/AxiosAdapter/AxiosAdapter";

describe('testar os endpoints de buscas de cargos', () => {

  test('Vai listar todos os cargos do banco de dados', async () => {
    const httpRequest = new AxiosAdapter("http://localhost:3000");

    const output = await httpRequest.get(`/role`);

    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBeGreaterThan(1);
  })

  test('Vai listar um cargo do banco de dados', async () => {
    const httpRequest = new AxiosAdapter("http://localhost:3000");

    const roleId = "a42e5363-0d8c-45e0-bb2d-9b2570145076";

    const output = await httpRequest.get(`/role/${roleId}`);

    expect(output).toBeInstanceOf(Object);
    expect(output).toHaveProperty('name');
    expect(output).toHaveProperty('description');
    expect(output).toHaveProperty('id');
  })

})