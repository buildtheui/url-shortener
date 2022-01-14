import { ShortLinkRequest } from "@application/types/short-link-request";
import { ShortLinkMongo } from "@infra/short-link-mongo";
import { ConfigHelpers } from "@infra/config-helpers";
import { RequestValidationError } from "@application/errors/request-validation-error";
import { CreateLink } from "../create-link";

describe("In regards to CreateLink", () => {
  const data: ShortLinkRequest = { originalUrl: "http://www.google.com" };
  let dbMock: ShortLinkMongo;
  let configMock: ConfigHelpers;
  let linkUseCase: CreateLink;

  beforeEach(() => {
    dbMock = new ShortLinkMongo();
    configMock = new ConfigHelpers();
    linkUseCase = new CreateLink(data, dbMock, configMock);
  });

  it("should save a valid url without an alias and expired date", () => {
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

  it("should save a valid url with an alias and expired date", () => {
    const newdata: ShortLinkRequest = {
      ...data,
      customAlias: "test",
      expireDate: 1234,
    };
    linkUseCase = new CreateLink(newdata, dbMock, configMock);

    linkUseCase.handle();

    const generatedId = (dbMock.generateShortId as jest.Mock).mock.results[0]
      .value;
    const hostUrl = (configMock.getHostURL as jest.Mock).mock.results[0].value;

    expect(dbMock.save).toHaveBeenCalledWith({
      customAlias: newdata.customAlias,
      expireDate: newdata.expireDate,
      id: generatedId,
      originalUrl: newdata.originalUrl,
      shortUrl: `${hostUrl}/${newdata.customAlias}`,
    });
  });

  it("should throw an error if the originalUrl does not come in the data", () => {
    const newdata: ShortLinkRequest = {
      originalUrl: "",
      customAlias: "test",
    };
    linkUseCase = new CreateLink(newdata, dbMock, configMock);

    expect(linkUseCase.handle.bind(linkUseCase)).rejects.toThrowError(
      RequestValidationError
    );
  });
});
