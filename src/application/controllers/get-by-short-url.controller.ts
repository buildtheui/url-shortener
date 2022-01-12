import { Request } from "express"
import { Controller } from "@application/base/controller"
import { ShortLinkMongo } from "src/infrastructure/short-link-mongo"
import { ConfigHelpers } from "@infra/config-helpers"
import { GetByShortUrl } from "@domain/use-cases/get-by-short-url"

export class GetByShortUrlController extends Controller {
  async forward(req: Request): Promise<object> {
    const { shortUrlId } = req.params

    const newShortLink = new GetByShortUrl(
      shortUrlId,
      new ShortLinkMongo()
    )
    return await newShortLink.handle()
  }
}
