import { ShortLinkRequest } from "@application/types/short-link-request"
import { IShortLinkDB } from "@domain/contracts/i-short-link-db"
import { ShortUrl } from "@domain/entities/short-url"

export class CreateLink {
  constructor(
    private data: ShortLinkRequest,
    private shortLinkDB: IShortLinkDB
  ) {}

  async handle() {
    const { originalUrl, customAlias, expireDate } = this.data

    const newShortId = this.shortLinkDB.generateShortId()

    const newLink = new ShortUrl(
      newShortId,
      originalUrl,
      customAlias,
      expireDate
    )

    return await this.shortLinkDB.save(newLink)
  }
}
