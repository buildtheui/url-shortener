import { UserData } from '../../domain/entities/user';

export interface IAuthService {
  generateSessionToken(user: UserData): string;
}
