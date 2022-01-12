import { Response } from "express"
import { Presenter } from "@application/base/presenter"
import { ShortLinkDoc } from "@infra/model/short-link"

export class GetByShortUrlPresenter extends Presenter {
  transform(response: { url: string }, expressResponse: Response): void {
    return expressResponse.redirect(301, response.url)
  }
}
