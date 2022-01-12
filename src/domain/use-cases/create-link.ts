import { RequestValidationError } from "@application/errors/request-validation-error";
import { ShortLinkRequest } from "@application/types/short-link-request";
import { IConfigHelpers } from "@domain/contracts/i-config-helpers";
import { IShortLinkDB } from "@domain/contracts/i-short-link-db";
import { ShortUrl } from "@domain/entities/short-url";

export class CreateLink {
  constructor(
    private data: ShortLinkRequest,
    private shortLinkDB: IShortLinkDB,
    private configHelpers: IConfigHelpers
  ) {}

  async handle() {
    const { originalUrl, customAlias, expireDate } = this.data;

    const newShortId = this.shortLinkDB.generateShortId();
    const shortUrl = `${this.configHelpers.getHostURL()}/${newShortId}`

    const newLink = new ShortUrl(
      newShortId,
      originalUrl,
      shortUrl,
      customAlias,
      expireDate
    );

    return await this.shortLinkDB.save(newLink);
  }
}
