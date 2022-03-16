import { Request, Response, NextFunction } from "express"
import { Controller } from "@shortener/application/base/controller"
import { Presenter } from "@shortener/application/base/presenter"

export const adaptRoute =
  (controller: Controller, presenter: Presenter) =>
  async (req: Request, res: Response, next?: NextFunction) => {
      const response = await controller.forward(req);
      return presenter.transform(response, res);
  }
