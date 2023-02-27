export interface IRepository<Entity> {
  save(input: Entity): Promise<Entity>
  findAll(): Promise<Entity[]>
  find(id: string): Promise<Entity>
  update(id: string, input: Entity): Promise<Entity>
  delete(id: string): Promise<void>
}