import { Response } from "express";
import { Presenter } from "@common";
import { GetByShortUrlHandle } from "@shortener/domain/use-cases/get-by-short-url";

export class GetByShortUrlPresenter extends Presenter {
  transform(
    response: GetByShortUrlHandle,
    expressResponse: Response
  ): void | Response {
    if (response.isExpired) {
      return expressResponse.setHeader("Content-type", "text/html").status(403)
        .send(`
        <h1>Forbidden request</h1>
        </br>
        <p>This url has expired</p>      
      `);
    }

    return expressResponse.redirect(301, response.url);
  }
}
