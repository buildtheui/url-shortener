import { BadRequestError } from '@common';
import { IUserDb } from '../../domain/contracts/i-user-db';
import { IAuthService } from '../../domain/contracts/i-auth-service';
import { SignUpResponse, UserSignUpData } from '../../domain/types/user-data';

export class SignUp {
  constructor(
    private data: UserSignUpData,
    private userDb: IUserDb,
    private authService: IAuthService
  ) {}

  async handle(): Promise<SignUpResponse> {
    const { email } = this.data;

    const existingUser = await this.userDb.findUserByEmail(email);

    if (existingUser) {
      throw new BadRequestError('email in use');
    }

    const user = await this.userDb.createUser(this.data);

    const jwt = this.authService.generateSessionToken(user);

    return { user, jwt };
  }
}
