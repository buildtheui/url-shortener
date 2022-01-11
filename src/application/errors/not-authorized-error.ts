import { CustomError } from "@application/base/custom-error"

export class NotAuthorizedError extends CustomError {
  readonly statusCode = 401
  static readonly defaultMessage = "Not authorized"

  constructor(message: string = NotAuthorizedError.defaultMessage) {
    super(message)

    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ]
  }
}
