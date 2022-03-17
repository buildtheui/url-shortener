import { Router } from 'express';
import { body } from 'express-validator';
import { adaptRoute } from '@common';
import { validateRequest } from '@common';
import { CreateController } from '../../application/controllers/create.controller';
import { CreatePresenter } from '../../application/presenters/create.presenter';

const router = Router();

export enum CreateErrors {
  originalUrlErr = 'The Url to convert must be a valid one',
  customAliasErr = 'Alias must be grater than 4 and less than 12 characters long',
  customAliasSpaceErr = "The alias shouldn't contain spaces",
  expireDateTypeErr = 'Expiration date should be a timestamp number',
  expireDateErr = 'Expiration date should be a future time',
}

router.post(
  '/create',
  [
    body('originalUrl').isURL().withMessage(CreateErrors.originalUrlErr),
    body('customAlias')
      .optional()
      .isString()
      .isLength({ min: 4, max: 12 })
      .withMessage(CreateErrors.customAliasErr)
      .custom((value) => !/\s/.test(value))
      .withMessage(CreateErrors.customAliasSpaceErr),
    body('expireDate')
      .optional()
      .isNumeric()
      .withMessage(CreateErrors.expireDateTypeErr)
      .custom((date) => date - Date.now() > 0)
      .withMessage(CreateErrors.expireDateErr),
  ],
  validateRequest,
  adaptRoute(new CreateController(), new CreatePresenter())
);

export { router as CreateURLRouter };
