import { UserData } from '../../domain/entities/user';

export interface IUserDb {
  findUserByEmail(email: string): UserData | undefined;
  createUser(user: UserData): UserData;
}
