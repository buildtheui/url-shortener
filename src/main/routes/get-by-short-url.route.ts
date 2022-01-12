import { Router } from "express";
import { adaptRoute } from "@application/adapters/route-adapter";
import { validateRequest } from "@main/middlewares/validate-request";
import { param } from "express-validator";
import { GetByShortUrlController } from "@application/controllers/get-by-short-url.controller";
import { GetByShortUrlPresenter } from "@application/presenters/get-by-short-url.presenter";

const router = Router();

router.get(
  "/:shortUrlId",
  [param("shortUrlId").isString().withMessage("Invalid short URL")],
  validateRequest,
  adaptRoute(new GetByShortUrlController(), new GetByShortUrlPresenter())
);

export { router as GetByIdRouter };
