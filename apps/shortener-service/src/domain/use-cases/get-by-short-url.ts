import { BadRequestError } from "@shortener/application/errors/bad-request-error";
import { IShortLinkDB } from "@shortener/domain/contracts/i-short-link-db";

export interface GetByShortUrlHandle {
  url: string;
  isExpired: boolean;
}

export const GET_BY_SHORT_URL_ERR = "URL not found";

export class GetByShortUrl {
  constructor(private shortUrlId: string, private shortLinkDB: IShortLinkDB) {}

  async handle(): Promise<GetByShortUrlHandle> {
    const urlValue = await this.shortLinkDB.getByShortId(this.shortUrlId);

    if (urlValue == null) {
      throw new BadRequestError(GET_BY_SHORT_URL_ERR);
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
