import { Router } from "express";
import { adaptRoute } from "@shortener/application/adapters/route-adapter";
import { validateRequest } from "@shortener/main/middlewares/validate-request";
import { param } from "express-validator";
import { GetByShortUrlController } from "@shortener/application/controllers/get-by-short-url.controller";
import { GetByShortUrlPresenter } from "@shortener/application/presenters/get-by-short-url.presenter";

const router = Router();

export enum GetByShortUrlErrors {
  invalidType = "Invalid short URL",
}

router.get(
  "/:shortUrlId",
  [
    param("shortUrlId")
      .isString()
      .notEmpty()
      .withMessage(GetByShortUrlErrors.invalidType),
  ],
  validateRequest,
  adaptRoute(new GetByShortUrlController(), new GetByShortUrlPresenter())
);

export { router as GetByIdRouter };
