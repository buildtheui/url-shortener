import { ShortLinkRequest } from "@application/types/short-link-request";
import { ShortLinkMongo } from "@infra/short-link-mongo";
import { ConfigHelpers } from "@infra/config-helpers";
import { CreateLink } from "../create-link";
jest.mock("@infra/short-link-mongo");
jest.mock("@infra/config-helpers");

describe("In regards to CreateLink", () => {
  const data: ShortLinkRequest = { originalUrl: "http://www.google.com" };

  it("should save a valid url without an alias and expired date", () => {
    const dbMock = new ShortLinkMongo();
    const configMock = new ConfigHelpers();
    const linkUseCase = new CreateLink(data, dbMock, configMock);

    linkUseCase.handle();

    const generatedId = (dbMock.generateShortId as jest.Mock).mock.results[0]
      .value;
    const hostUrl = (configMock.getHostURL as jest.Mock).mock.results[0].value;

    expect(dbMock.save).toHaveBeenCalledWith({
      customAlias: undefined,
      expireDate: undefined,
      id: generatedId,
      originalUrl: data.originalUrl,
      shortUrl: `${hostUrl}/${generatedId}`,
    });
  });
});
