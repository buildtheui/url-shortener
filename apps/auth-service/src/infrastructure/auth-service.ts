import jwt from 'jsonwebtoken';
import { IAuthService } from '../domain/contracts/i-auth-service';
import { UserData } from '../domain/entities/user';

export class AuthService implements IAuthService {
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
