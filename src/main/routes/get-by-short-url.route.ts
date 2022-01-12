import { Router } from "express";
import { adaptRoute } from "@application/adapters/route-adapter";
import { CreateController } from "@application/controllers/create.controller";
import { CreatePresenter } from "@application/presenters/create.presenter";
import { validateRequest } from "@main/middlewares/validate-request";
import { body, param } from "express-validator";

const router = Router();

router.get(
  "/:shortId",
  [
    param("shortId").isString().withMessage("Invalid short URL")      
  ],
  validateRequest,
  adaptRoute(new CreateController(), new CreatePresenter())
);

export { router as GetByIdRouter };
