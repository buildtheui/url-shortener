import { Response } from "express"
import { Presenter } from "@application/base/presenter"
import { ShortUrlFields } from "@domain/entities/short-url"

export class CreatePresenter extends Presenter {
  // TODO: decouple response type ShortLinkDoc from mongo
  transform(response: ShortUrlFields, expressResponse: Response): Response {
    // TODO: type the response better
    return expressResponse.status(200).json(response)
  }
}
