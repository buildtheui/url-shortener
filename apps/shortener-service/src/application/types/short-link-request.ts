import { ShortUrlFields } from '@shortener/domain/entities/short-url';

export type ShortLinkRequest = Omit<ShortUrlFields, 'id' | 'shortUrl'>;
