import { Controller } from '@common';
import { Request } from 'express';
import { UserData } from '../../domain/entities/user';
import { SignUp } from '../../domain/use-cases/sign-up';
import { userDb } from '../../infrastructure/user-db';
import { AuthService } from '../../infrastructure/auth-service';

export class SignUpController extends Controller {
  async forward(req: Request): Promise<object> {
    const { name, email, password } = req.body;
    const signUpUseCase = new SignUp(
      { name, email, password } as UserData,
      new userDb(),
      new AuthService()
    );

    const { jwt, user } = await signUpUseCase.handle();

    req.session = {
      jwt,
    };

    return user;
  }
}
