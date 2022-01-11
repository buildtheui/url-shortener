import { Response } from "express"
import { Presenter } from "@application/base/presenter"
import { ShortLinkDoc } from "@infra/model/short-link"

export class CreatePresenter extends Presenter {
  // TODO: decouple response type ShortLinkDoc from mongo
  transform(response: ShortLinkDoc, expressResponse: Response): Response {
    const {_id, __v, ...rest} = response.toObject();
    // TODO: type the response better
    return expressResponse.status(200).json({...rest, id: _id })
  }
}
