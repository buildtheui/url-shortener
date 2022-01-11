import { IShortLinkData, IShortLinkDB } from "@domain/contracts/i-short-link-db"
import { nanoid } from "nanoid"
import { ShortLink } from "./model/short-link"

export class ShortLinkMongo implements IShortLinkDB {
  async save(data: IShortLinkData): Promise<object> {
    const { id, ...rest } = data
    const dataToSave = { ...rest, _id: id }
    const link = ShortLink.build(dataToSave)
    return await link.save();
  }
  deleteById(): object {
    throw new Error("Method not implemented.")
  }
  generateShortId(): string {
    return nanoid(10)
  }
}
