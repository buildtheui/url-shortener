import { Request, Response, NextFunction } from "express"
import { Controller } from "@application/base/controller"
import { Presenter } from "@application/base/presenter"

export const adaptRoute =
  (controller: Controller, presenter: Presenter) =>
  async (req: Request, res: Response, next?: NextFunction) => {
      const response = await controller.forward(req);
      return presenter.transform(response, res);
  }
