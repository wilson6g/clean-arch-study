import crypto from 'crypto';


export type InputRole = {
  id?: string;
  name: string;
  description: string;
}

export class Role {

  readonly id?: string;
  name: string;
  description: string;

  constructor(props: InputRole) {
    this.id = props.id ?? crypto.randomUUID();
    this.name = props.name;
    this.description = props.description;
  }

  roleIsExists(input: InputRole, roles: InputRole[]): boolean {
    const role = roles.find((role) => role.name == input.name);

    if (role) {
      return true;
    }

    return false;
  }

}