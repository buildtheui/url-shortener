import { IUserDb } from '../domain/contracts/i-user-db';
import { UserData } from '../domain/entities/user';

export class userDb implements IUserDb {
  findUserByEmail(email: string): UserData {
    throw new Error('Method not implemented.');
  }
  createUser(user: UserData): UserData {
    throw new Error('Method not implemented.');
  }
}
