export interface ShortUrlFields {
  id: string;
  originalUrl: string;
  shortUrl: string;
  customAlias?: string;
  expireDate?: number;
}

export class ShortUrl implements ShortUrlFields {
  id: string;
  originalUrl: string;
  shortUrl: string;
  customAlias?: string;
  expireDate?: number;

  constructor(
    id: string,
    originalUrl: string,
    shortUrl: string,
    customAlias?: string,
    expireDate?: number
  ) {
    this.id = id;
    this.originalUrl = originalUrl;
    this.shortUrl = shortUrl;
    this.customAlias = customAlias;
    this.expireDate = expireDate;
  }
}
