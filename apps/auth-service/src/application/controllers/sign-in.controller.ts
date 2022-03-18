import { Request } from 'express';
import { Controller } from '@common';
import { SignIn } from '../../domain/use-cases/sign-in';
import { userDb } from '@auth/infrastructure/user-db';
import { AuthService } from '@auth/infrastructure/auth-service';

export class SignInController extends Controller {
  async forward(req: Request): Promise<object> {
    const { email, password } = req.body;
    const signIn = new SignIn(
      { email, password },
      new userDb(),
      new AuthService()
    );
    const { user, jwt } = await signIn.handle();
    req.session = {
      jwt,
    };
    return user;
  }
}
