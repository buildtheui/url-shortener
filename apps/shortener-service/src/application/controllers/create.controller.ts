import { Request } from "express"
import { Controller } from "@common"
import { CreateLink } from "@shortener/domain/use-cases/create-link"
import { ShortLinkMongo } from "@shortener/infrastructure/short-link-mongo"
import { ConfigHelpers } from "@shortener/infrastructure/config-helpers"

export class CreateController extends Controller {
  async forward(req: Request): Promise<object> {
    const { originalUrl, customAlias, expireDate } = req.body;
    const newShortLink = new CreateLink(
      { originalUrl, customAlias, expireDate },
      new ShortLinkMongo(),
      new ConfigHelpers()
    )
    return await newShortLink.handle()
  }
}
