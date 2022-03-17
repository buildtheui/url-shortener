import { Router } from 'express';
import { adaptRoute } from '@common';
import { validateRequest } from '@common';
import { param } from 'express-validator';
import { GetByShortUrlController } from '../../application/controllers/get-by-short-url.controller';
import { GetByShortUrlPresenter } from '../../application/presenters/get-by-short-url.presenter';

const router = Router();

export enum GetByShortUrlErrors {
  invalidType = 'Invalid short URL',
}

router.get(
  '/:shortUrlId',
  [
    param('shortUrlId')
      .isString()
      .notEmpty()
      .withMessage(GetByShortUrlErrors.invalidType),
  ],
  validateRequest,
  adaptRoute(new GetByShortUrlController(), new GetByShortUrlPresenter())
);

export { router as GetByIdRouter };
