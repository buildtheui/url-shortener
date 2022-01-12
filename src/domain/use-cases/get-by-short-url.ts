import { BadRequestError } from "@application/errors/bad-request-error";
import { IShortLinkDB } from "@domain/contracts/i-short-link-db";
import { ShortUrl } from "@domain/entities/short-url";

export class GetByShortUrl {
  constructor(private shortUrlId: string, private shortLinkDB: IShortLinkDB) {}

  async handle() {
    const urlValue = await this.shortLinkDB.getByShortId(this.shortUrlId);
    
    if (urlValue == null) {
      throw new BadRequestError("URL not found");
    }
    return { url: urlValue.originalUrl };
  }
}
