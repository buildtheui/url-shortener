import { CustomError } from "@shortener/application/base/custom-error"

export class ConnectionError extends CustomError {
  readonly statusCode = 500
  static readonly defaultMessage = "Server Error"

  constructor(message: string = ConnectionError.defaultMessage) {
    super(message)
    Object.setPrototypeOf(this, ConnectionError.prototype)
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }]
  }
}
