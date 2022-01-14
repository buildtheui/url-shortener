import request from "supertest";
import { GET_BY_SHORT_URL_ERR } from "@domain/use-cases/get-by-short-url";
import { app } from "@main/app";

jest.unmock("@infra/short-link-mongo");
jest.unmock("@infra/config-helpers");

describe("regarding getting /:shortUrlId", () => {
  const dataInit = {
    originalUrl: "https://www.google.com",
  };

  it("should redirect to the original url by short id", async () => {
    const responseSave = await request(app)
      .post("/create")
      .send(dataInit)
      .expect(200);

    const shortId = responseSave.body.id;

    const response = await request(app).get(`/${shortId}`).expect(301);
    expect(response.header.location).toBe(dataInit.originalUrl);
  });

  it("should redirect to the original url by custom alias", async () => {
    const data = {
      ...dataInit,
      customAlias: "google",
    };

    const responseSave = await request(app)
      .post("/create")
      .send(data)
      .expect(200);

    const customAlias = responseSave.body.customAlias;

    const response = await request(app).get(`/${customAlias}`).expect(301);
    expect(response.header.location).toBe(data.originalUrl);
  });

  it("should fail if invalid shortUrlId is sent", async () => {
    const response = await request(app).get(`/dont-exist`).expect(400);
    const err = JSON.parse(response.text);
    expect(err?.errors[0]?.message).toBe(GET_BY_SHORT_URL_ERR);
  });

  describe("given that the time is mocked", () => {
    const REAL_DATE = Date.now;
    const FAKE_TIMESTAMP = 1642185788830;

    afterAll(() => {
      global.Date.now = REAL_DATE;
    });
    it("should return html error page if url expired", async () => {
      global.Date.now = jest.fn(() => FAKE_TIMESTAMP);

      const data = {
        ...dataInit,
        customAlias: "google",
        expireDate: Date.now() + 1,
      };

      const responseSave = await request(app)
        .post("/create")
        .send(data)
        .expect(200);

      const customAlias = responseSave.body.customAlias;

      global.Date.now = jest.fn(() => FAKE_TIMESTAMP + 2);

      const response = await request(app).get(`/${customAlias}`).expect(403);

      expect(response.text).toEqual(
        expect.stringContaining("This url has expired")
      );
    });
  });
});
