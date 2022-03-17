export interface UserData {
	name: string;
	email: string;
	password: string;
}

export class User implements UserData {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}
}
