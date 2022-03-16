import { Request } from "express"

export abstract class Controller {
  abstract forward(req: Request): Promise<object>
}
