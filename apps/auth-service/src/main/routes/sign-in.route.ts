import { Router } from 'express';
import { body } from 'express-validator';
import { adaptRoute, validateRequest } from '@common';
import { SignInController } from '../../application/controllers/sign-in.controller';
import { SignInPresenter } from '../../application/presenters/sign-in.presenter';

const router = Router();

export enum SignInErrors {
  emailErr = 'invalid email format',
  passwordErr = 'password can not be empty',
}

router.get(
  '/sign-in',
  [
    body('email').isEmail().withMessage(SignInErrors.emailErr),
    body('password').notEmpty().withMessage(SignInErrors.passwordErr),
  ],
  validateRequest,
  adaptRoute(new SignInController(), new SignInPresenter())
);

export { router as SignInRouter };
