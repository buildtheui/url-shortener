import { BadRequestError } from "@application/errors/bad-request-error";
import { IShortLinkDB } from "@domain/contracts/i-short-link-db";

export interface GetByShortUrlHandle {
  url: string;
  isExpired: boolean;
}

export class GetByShortUrl {
  constructor(private shortUrlId: string, private shortLinkDB: IShortLinkDB) {}

  async handle(): Promise<GetByShortUrlHandle> {
    const urlValue = await this.shortLinkDB.getByShortId(this.shortUrlId);

    if (urlValue == null) {
      throw new BadRequestError("URL not found");
    }
    return {
      url: urlValue.originalUrl,
      isExpired: this.hasUrlExpired(urlValue.expireDate),
    };
  }

  private hasUrlExpired(date: number | undefined): boolean {
    return date != null && date - Date.now() <= 0;
  }
}
