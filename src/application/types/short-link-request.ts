import { ShortUrlFields } from "@domain/entities/short-url";

export interface ShortLinkRequest extends Omit<ShortUrlFields, "id" | "shortUrl"> {} 