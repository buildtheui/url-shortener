import { RequestValidationError } from "@application/errors/request-validation-error";
import {
  IShortLinkData,
  IShortLinkDB,
} from "@domain/contracts/i-short-link-db";
import { ShortUrlFields } from "@domain/entities/short-url";
import { nanoid } from "nanoid";
import { ShortLink } from "./model/short-link";

export class ShortLinkMongo implements IShortLinkDB {
  async save(data: IShortLinkData): Promise<ShortUrlFields> {
    let response = await ShortLink.findOne({ customAlias: data.customAlias });
    if (response) {
      const customMessageError = RequestValidationError.buildCustomMessage(
        "The URL alias already exists, please try another one",
        data.customAlias,
        "customAlias",
        "body"
      );
      throw new RequestValidationError([customMessageError]);
    }

    const { id: shortId, ...rest } = data;
    const dataToSave = { ...rest, _id: shortId };
    const link = ShortLink.build(dataToSave);
    const { id, originalUrl, shortUrl, customAlias, expireDate } =
      await link.save();
    return { id, originalUrl, shortUrl, customAlias, expireDate };
  }

  async getByShortId(idOrAlias: string): Promise<ShortUrlFields | null> {
    let response = await ShortLink.findOne({ customAlias: idOrAlias });
    if (!response) {
      response = await ShortLink.findById(idOrAlias);
      if (!response) return null;
    }
    const { id, originalUrl, shortUrl, customAlias, expireDate } = response;
    return { id, originalUrl, shortUrl, customAlias, expireDate };
  }

  deleteById(): object {
    throw new Error("Method not implemented.");
  }
  generateShortId(): string {
    return nanoid(10);
  }
}
