import { IAuthService } from '../domain/contracts/i-auth-service';
import { UserData } from '../domain/entities/user';

export class AuthService implements IAuthService {
  generateSessionToken(user: UserData): string {
    throw new Error('Method not implemented.');
  }
}
