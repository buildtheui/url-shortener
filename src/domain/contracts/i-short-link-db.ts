import { ShortUrlFields } from "@domain/entities/short-url";

export interface IShortLinkData extends ShortUrlFields {

}

export interface IShortLinkDB {
    save( data: IShortLinkData ): object;
    deleteById(): object;
    generateShortId(): string;
}