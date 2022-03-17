import { Router } from 'express';
import { body } from 'express-validator';
import { adaptRoute, validateRequest } from '@common';
import { SignUpController } from '../../application/controllers/sign-up.controller';
import { SignUpPresenter } from '../../application/presenters/sign-up.presenter';

const router = Router();

export enum SignUpErrors {
  nameLengthErr = 'The name must have 40 characters max and 2 min',
  emailErr = 'please add a valid email',
  passwordErr = 'please set a stronger password',
}

router.post(
  '/sign-up',
  [
    body('name')
      .isString()
      .isLength({ min: 2, max: 40 })
      .withMessage(SignUpErrors.nameLengthErr),
    body('email').isEmail().withMessage(SignUpErrors.emailErr),
    body('password').isStrongPassword().withMessage(SignUpErrors.passwordErr),
  ],
  validateRequest,
  adaptRoute(new SignUpController(), new SignUpPresenter())
);

export { router as SignUpRouter };
