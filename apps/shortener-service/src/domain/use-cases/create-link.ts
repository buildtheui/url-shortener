import { RequestValidationError } from "@common";
import { ShortLinkRequest } from "@shortener/application/types/short-link-request";
import { IConfigHelpers } from "@shortener/domain/contracts/i-config-helpers";
import { IShortLinkDB } from "@shortener/domain/contracts/i-short-link-db";
import { ShortUrl } from "@shortener/domain/entities/short-url";

export class CreateLink {
  constructor(
    private data: ShortLinkRequest,
    private shortLinkDB: IShortLinkDB,
    private configHelpers: IConfigHelpers
  ) {}

  async handle() {
    const { originalUrl, customAlias, expireDate } = this.data;

    if (!originalUrl) {
      const errorMessage = RequestValidationError.buildCustomMessage(
        "originalUrl is required",
        originalUrl,
        "originalUrl",
        "body"
      );
      throw new RequestValidationError([errorMessage]);
    }

    const newShortId = this.shortLinkDB.generateShortId();
    const newPath = customAlias ? customAlias : newShortId;
    const shortUrl = `${this.configHelpers.getHostURL()}/${newPath}`;

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
