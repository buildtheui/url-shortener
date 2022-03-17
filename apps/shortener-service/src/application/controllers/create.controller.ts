import { Request } from 'express';
import { Controller } from '@common';
import { CreateLink } from '../../domain/use-cases/create-link';
import { ShortLinkMongo } from '../../infrastructure/short-link-mongo';
import { ConfigHelpers } from '../../infrastructure/config-helpers';

export class CreateController extends Controller {
  async forward(req: Request): Promise<object> {
    const { originalUrl, customAlias, expireDate } = req.body;
    const newShortLink = new CreateLink(
      { originalUrl, customAlias, expireDate },
      new ShortLinkMongo(),
      new ConfigHelpers()
    );
    return await newShortLink.handle();
  }
}
