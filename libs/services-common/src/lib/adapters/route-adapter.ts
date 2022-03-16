import { Request, Response, NextFunction } from "express"
import { Controller } from "../base/controller"
import { Presenter } from "../base/presenter"

export const adaptRoute =
  (controller: Controller, presenter: Presenter) =>
  async (req: Request, res: Response, next?: NextFunction) => {
      const response = await controller.forward(req);
      return presenter.transform(response, res);
  }
