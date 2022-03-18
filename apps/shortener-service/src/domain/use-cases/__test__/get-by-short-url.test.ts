import { BadRequestError } from '@common';
import { ShortLinkMongo } from '../../../infrastructure/short-link-mongo';
import { GetByShortUrl } from '../get-by-short-url';

jest.mock('../../../infrastructure/short-link-mongo');

describe('Regarding getting the url by shortId', () => {
  const buildData = (
    id = 'ARf2fgr_',
    expiredDate: number = Number.MAX_VALUE
  ) => ({
    id: 'ARf2fgr_',
    originalUrl: `test.io/${id}`,
    expireDate: expiredDate,
  });

  it('it should get a not expired short url', async () => {
    const data = buildData();
    const dbMock = new ShortLinkMongo();
    (dbMock.getByShortId as jest.Mock).mockReturnValue(data);

    const getByShortUrl = new GetByShortUrl(data.id, dbMock);
    const result = await getByShortUrl.handle();

    expect(result).toEqual({
      url: data.originalUrl,
      isExpired: false,
    });
  });

  it('it should get an expired short url', async () => {
    const data = buildData('ALIAS-LINK', 10);
    const dbMock = new ShortLinkMongo();
    (dbMock.getByShortId as jest.Mock).mockReturnValue(data);

    const getByShortUrl = new GetByShortUrl(data.id, dbMock);
    const result = await getByShortUrl.handle();

    expect(result).toEqual({
      url: data.originalUrl,
      isExpired: true,
    });
  });

  it('it should throw if the short url is not found by id or alias', async () => {
    const dbMock = new ShortLinkMongo();
    (dbMock.getByShortId as jest.Mock).mockReturnValue(undefined);

    const getByShortUrl = new GetByShortUrl('ALIAS-LINK', dbMock);

    expect(getByShortUrl.handle.bind(getByShortUrl)).rejects.toThrowError(
      new BadRequestError('URL not found')
    );
  });
});
