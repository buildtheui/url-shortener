import { ShortUrlFields } from '../../domain/entities/short-url';

export type IShortLinkData = ShortUrlFields;

export interface IShortLinkDB {
  save(data: IShortLinkData): Promise<ShortUrlFields>;
  getByShortId(shortId: string): Promise<ShortUrlFields | null>;
  deleteById(): object;
  generateShortId(): string;
}
