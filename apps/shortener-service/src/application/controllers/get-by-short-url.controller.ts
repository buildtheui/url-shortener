import { Request } from 'express';
import { Controller } from '@common';
import { ShortLinkMongo } from '../../infrastructure/short-link-mongo';
import { GetByShortUrl } from '../../domain/use-cases/get-by-short-url';

export class GetByShortUrlController extends Controller {
  async forward(req: Request): Promise<object> {
    const { shortUrlId } = req.params;

    const newShortLink = new GetByShortUrl(shortUrlId, new ShortLinkMongo());
    return await newShortLink.handle();
  }
}
