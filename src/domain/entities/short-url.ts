export interface ShortUrlFields {
  id: string;  
  originalUrl: string
  customAlias?: string
  expireDate?: number
}

export class ShortUrl implements ShortUrlFields {
  id: string;  
  originalUrl: string
  customAlias?: string
  expireDate?: number

  constructor(id: string, originalUrl: string, customAlias?: string, expireDate?: number) {
    this.id = id;  
    this.originalUrl = originalUrl
    this.customAlias = this.validateAlias(customAlias)
    this.expireDate = this.expireDate
  }

  private validateAlias(customAlias?: string): string | undefined {
    if (
      customAlias != null &&
      (customAlias.length === 0 || customAlias.length > 12)
    ) {
      // TODO: Change for custom error
      throw new Error("invalid custom alias length")
    }
    return customAlias
  }
}
