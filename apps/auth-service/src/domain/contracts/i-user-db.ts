import { UserData } from '../../domain/entities/user';

export interface IUserDb {
  findUserByEmail(email: string): Promise<UserData | undefined>;
  createUser(user: UserData): Promise<UserData>;
}
