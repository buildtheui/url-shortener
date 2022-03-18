import jwt from 'jsonwebtoken';
import { IAuthService } from '../domain/contracts/i-auth-service';
import { UserData } from '../domain/entities/user';
import { Password } from './util/password';

export class AuthService implements IAuthService {
  comparePasswords(storedPassword: string, password: string): Promise<boolean> {
    return Password.compare(storedPassword, password);
  }

  generateSessionToken(user: UserData): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY
    );
  }
}
