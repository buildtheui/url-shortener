import request from "supertest";
import { app } from "@main/app";
import { CreateErrors } from "@main/routes/create.route";

jest.unmock("@infra/short-link-mongo");
jest.unmock("@infra/config-helpers");

describe("regarding POST /create", () => {
  it("should create a new short url with all the params filled", async () => {
    const data = {
      originalUrl: "https://www.google.com",
      customAlias: "google",
      expireDate: Date.now() + 10000,
    };
    const response = await request(app).post("/create").send(data).expect(200);
    expect(response.body).toEqual({
      customAlias: data.customAlias,
      expireDate: data.expireDate,
      id: response.body.id,
      originalUrl: data.originalUrl,
      shortUrl: `${process.env.HOST}/${data.customAlias}`,
    });
  });

  it("should create a new short url with id instead of alias", async () => {
    const data = {
      originalUrl: "https://www.google.com",
    };
    const response = await request(app).post("/create").send(data).expect(200);
    expect(response.body).toEqual({
      id: response.body.id,
      originalUrl: data.originalUrl,
      shortUrl: `${process.env.HOST}/${response.body.id}`,
    });
  });

  it("should fail if not valid originalUrl is sent", async () => {
    const data = {
      originalUrl: "",
    };
    const response = await request(app).post("/create").send(data).expect(400);

    const err = JSON.parse(response.text);
    expect(err?.errors[0]?.message).toBe(CreateErrors.originalUrlErr);

    data.originalUrl = "this is a wrong url.com";

    const responseTwo = await request(app)
      .post("/create")
      .send(data)
      .expect(400);

    const errTwo = JSON.parse(responseTwo.text);
    expect(errTwo?.errors[0]?.message).toBe(CreateErrors.originalUrlErr);
  });

  it("should fail if not valid customAlias is sent", async () => {
    const data = {
      originalUrl: "https://www.google.com",
      customAlias: "txt"
    };
    const response = await request(app).post("/create").send(data).expect(400);

    const err = JSON.parse(response.text);
    expect(err?.errors[0]?.message).toBe(CreateErrors.customAliasErr);

    data.customAlias = "this-is-an-invalid-alias-to-long"
    const responseTwo = await request(app).post("/create").send(data).expect(400);

    const errTwo = JSON.parse(responseTwo.text);
    expect(errTwo?.errors[0]?.message).toBe(CreateErrors.customAliasErr);

    data.customAlias = "is invalid"
    const responseThree = await request(app).post("/create").send(data).expect(400);

    const errThree = JSON.parse(responseThree.text);
    expect(errThree?.errors[0]?.message).toBe(CreateErrors.customAliasSpaceErr);
  });

  it("should fail if not valid expire data is sent", async () => {
    const data = {
      originalUrl: "https://www.google.com",
      expireDate: "jan 31, 2022"
    };
    const response = await request(app).post("/create").send(data).expect(400);

    const err = JSON.parse(response.text);
    expect(err?.errors[0]?.message).toBe(CreateErrors.expireDateTypeErr);

    // @ts-expect-error
    data.expireDate = 123
    const responsTwo = await request(app).post("/create").send(data).expect(400);

    const errTwo = JSON.parse(responsTwo.text);
    expect(errTwo?.errors[0]?.message).toBe(CreateErrors.expireDateErr);

  });
});
