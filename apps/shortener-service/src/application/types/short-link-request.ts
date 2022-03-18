import { ShortUrlFields } from '../../domain/entities/short-url';

export type ShortLinkRequest = Omit<ShortUrlFields, 'id' | 'shortUrl'>;
