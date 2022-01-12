import { Router } from "express";
import { adaptRoute } from "@application/adapters/route-adapter";
import { CreateController } from "@application/controllers/create.controller";
import { CreatePresenter } from "@application/presenters/create.presenter";
import { validateRequest } from "@main/middlewares/validate-request";
import { body } from "express-validator";

const router = Router();

router.post(
  "/create",
  [
    body("originalUrl")
      .isURL()
      .withMessage("The Url to convert must be a valid one"),
    body("customAlias")
      .optional()
      .isString()
      .isLength({ min: 4, max: 12 })
      .withMessage(
        "Alias must be grater than 4 and less than 12 characters long"
      ),
    body("expireDate")
      .optional()
      .isNumeric()
      .custom((date) => date - Date.now() > 0)
      .withMessage("Expiration date for the URL is not valid"),
  ],
  validateRequest,
  adaptRoute(new CreateController(), new CreatePresenter())
);

export { router as CreateURLRouter };
