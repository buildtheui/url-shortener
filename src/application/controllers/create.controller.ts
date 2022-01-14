import { Request } from "express"
import { Controller } from "@application/base/controller"
import { CreateLink } from "@domain/use-cases/create-link"
import { ShortLinkMongo } from "@infra/short-link-mongo"
import { ConfigHelpers } from "@infra/config-helpers"

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
