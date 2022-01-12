import {
  IShortLinkData,
  IShortLinkDB,
} from "@domain/contracts/i-short-link-db";
import { ShortUrlFields } from "@domain/entities/short-url";
import { nanoid } from "nanoid";
import { ShortLink, ShortLinkDoc } from "./model/short-link";

export class ShortLinkMongo implements IShortLinkDB {
  async save(data: IShortLinkData): Promise<ShortUrlFields> {
    const { id: shortId, ...rest } = data;
    const dataToSave = { ...rest, _id: shortId };
    const link = ShortLink.build(dataToSave);
    const { id, originalUrl, shortUrl, customAlias, expireDate } =
      await link.save();
    return { id, originalUrl, shortUrl, customAlias, expireDate };
  }

  async getByShortId(shortId: string): Promise<ShortUrlFields | null> {
    const response = await ShortLink.findById(shortId);
    if (!response) return null;
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
