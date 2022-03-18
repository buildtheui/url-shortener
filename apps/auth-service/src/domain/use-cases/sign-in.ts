import { BadRequestError } from '@common';
import { IAuthService } from '../contracts/i-auth-service';
import { IUserDb } from '../contracts/i-user-db';
import { SignInResponse, UserSignIpData } from '../types/user-data';

export class SignIn {
  constructor(
    private data: UserSignIpData,
    private userDb: IUserDb,
    private authService: IAuthService
  ) {}

  async handle(): Promise<SignInResponse> {
    const { email, password } = this.data;

    const user = await this.userDb.findUserByEmail(email);

    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const isCorrectPassword = await this.authService.comparePasswords(
      user.password,
      password
    );

    if (!isCorrectPassword) {
      throw new BadRequestError('Invalid credentials');
    }

    const jwt = this.authService.generateSessionToken(user);

    return { user, jwt };
  }
}
