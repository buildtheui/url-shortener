export interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
}

export class User implements UserData {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string
  ) {}
}
