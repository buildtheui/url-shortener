import { UserData } from '../../domain/entities/user';

export interface IAuthService {
  generateSessionToken(user: UserData): string;
  comparePasswords(storedPassword: string, password: string): Promise<boolean>;
}
