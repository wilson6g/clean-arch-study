import crypto from 'crypto';

export type InputUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class User {

  id: string;
  name: string;
  email: string;
  password: string;

  constructor(props: InputUser) {
    this.id = props.id ?? crypto.randomUUID();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  userIsExists(input: User, users: InputUser[]): boolean {
    const user = users.find((user) => user.name === input.name);

    if (user) {
      return true;
    }

    return false;
  }

}